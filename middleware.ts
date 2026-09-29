import {NextRequest,NextResponse} from "next/server";import {jwtVerify} from "jose";
export async function middleware(r:NextRequest){const t=r.cookies.get("s")?.value;let ok=false;
 if(t){try{await jwtVerify(t,new TextEncoder().encode(process.env.SESSION_SECRET!));ok=true}catch{}}
 if(!ok)return NextResponse.redirect(new URL("/login",r.url));return NextResponse.next();}
export const config={matcher:["/dashboard/:path*","/inventory/:path*","/api/export"]};
