import {describe,it,expect,beforeAll,afterAll} from "vitest";
import {pool} from "../lib/db";import {getItem,listItems} from "../lib/items";
// Requires a migrated DATABASE_URL; skipped otherwise.
describe.skipIf(!process.env.DATABASE_URL)("access control",()=>{
 let a="",b="",item="";
 beforeAll(async()=>{const mk=async(e:string)=>(await pool.query("INSERT INTO users(email,password_hash) VALUES($1,'x') RETURNING id",[e+Date.now()])).rows[0].id;
  a=await mk("a");b=await mk("b");item=(await pool.query("INSERT INTO items(user_id,name) VALUES($1,'secret') RETURNING id",[a])).rows[0].id;});
 afterAll(async()=>{await pool.query("DELETE FROM users WHERE id IN($1,$2)",[a,b]);await pool.end();});
 it("owner can read",async()=>expect((await getItem(a,item))?.name).toBe("secret"));
 it("other user cannot read by id",async()=>expect(await getItem(b,item)).toBeNull());
 it("other user's list is empty",async()=>expect(await listItems(b)).toHaveLength(0));});
