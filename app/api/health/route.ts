import {pool} from "@/lib/db";export const dynamic="force-dynamic";
export async function GET(){try{await pool.query("SELECT 1");return Response.json({status:"ok"})}catch{return Response.json({status:"db_error"},{status:503})}}
