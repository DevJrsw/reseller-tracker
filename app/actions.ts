"use server";
import bcrypt from "bcryptjs";import {z} from "zod";import {redirect} from "next/navigation";import {revalidatePath} from "next/cache";
import {pool} from "@/lib/db";import {createSession,destroySession,requireUser} from "@/lib/session";
import {itemSchema} from "@/lib/schema";import {COLS,parseCsv} from "@/lib/csv";
const cred=z.object({email:z.string().trim().toLowerCase().email("Enter a valid email"),password:z.string().min(8,"Password must be at least 8 characters")});
const err=(p:string,m:string)=>redirect(`${p}?error=${encodeURIComponent(m)}`);
export async function signup(fd:FormData){const r=cred.safeParse(Object.fromEntries(fd));if(!r.success)err("/signup",r.error.issues[0].message);
 const {email,password}=r.data!;const h=await bcrypt.hash(password,12);
 try{const u=await pool.query("INSERT INTO users(email,password_hash) VALUES($1,$2) RETURNING id",[email,h]);await createSession(u.rows[0].id)}
 catch(e:any){if(e.code==="23505")err("/signup","That email is already registered");throw e}
 redirect("/dashboard");}
export async function login(fd:FormData){const r=cred.safeParse(Object.fromEntries(fd));if(!r.success)err("/login","Invalid email or password");
 const u=(await pool.query("SELECT id,password_hash FROM users WHERE email=$1",[r.data!.email])).rows[0];
 const ok=await bcrypt.compare(r.data!.password,u?.password_hash??"$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidi");
 if(!u||!ok)err("/login","Invalid email or password");await createSession(u.id);redirect("/dashboard");}
export async function logout(){destroySession();redirect("/login");}
const F=COLS;
export async function saveItem(fd:FormData){const uid=await requireUser();const id=fd.get("id") as string|null;
 const r=itemSchema.safeParse(Object.fromEntries(fd));const back=id?`/inventory/${id}`:"/inventory/new";
 if(!r.success)err(back,r.error.issues.map(i=>`${i.path[0]}: ${i.message}`).join("; "));
 const d:any=r.data;const v=F.map(k=>d[k]??null);
 if(id){const res=await pool.query(`UPDATE items SET ${F.map((k,i)=>`${k}=$${i+3}`).join(",")},updated_at=now() WHERE id=$1 AND user_id=$2`,[id,uid,...v]);if(!res.rowCount)err("/inventory","Item not found")}
 else await pool.query(`INSERT INTO items(user_id,${F.join(",")}) VALUES($1,${F.map((_,i)=>`$${i+2}`).join(",")})`,[uid,...v]);
 revalidatePath("/inventory");redirect("/inventory");}
export async function archiveItem(fd:FormData){const uid=await requireUser();
 await pool.query("UPDATE items SET status='Archived',updated_at=now() WHERE id=$1 AND user_id=$2",[fd.get("id"),uid]);revalidatePath("/inventory");}
export async function deleteItem(fd:FormData){const uid=await requireUser();
 await pool.query("DELETE FROM items WHERE id=$1 AND user_id=$2",[fd.get("id"),uid]);revalidatePath("/inventory");redirect("/inventory");}
export async function importCsv(fd:FormData){const uid=await requireUser();const f=fd.get("file") as File|null;
 if(!f||!f.size)err("/inventory","Choose a CSV file");let n=0;
 for(const row of parseCsv(await f!.text())){const r=itemSchema.safeParse({status:"In Stock",...row});if(!r.success)err("/inventory",`Row ${n+2}: ${r.error.issues[0].message}`);
  const d:any=r.data;await pool.query(`INSERT INTO items(user_id,${F.join(",")}) VALUES($1,${F.map((_,i)=>`$${i+2}`).join(",")})`,[uid,...F.map(k=>d[k]??null)]);n++}
 revalidatePath("/inventory");redirect(`/inventory?imported=${n}`);}
