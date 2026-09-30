import {SignJWT,jwtVerify} from "jose";import {cookies} from "next/headers";import {redirect} from "next/navigation";
const key=()=>{const s=process.env.SESSION_SECRET;if(!s||s.length<16)throw new Error("SESSION_SECRET missing/too short");return new TextEncoder().encode(s)};
export async function createSession(uid:string){const t=await new SignJWT({uid}).setProtectedHeader({alg:"HS256"}).setExpirationTime("7d").sign(key());
 cookies().set("s",t,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:604800});}
export const destroySession=()=>cookies().delete("s");
export async function currentUserId():Promise<string|null>{const c=cookies().get("s")?.value;if(!c)return null;try{return (await jwtVerify(c,key())).payload.uid as string}catch{return null}}
export async function requireUser(){const id=await currentUserId();if(!id)redirect("/login");return id}
