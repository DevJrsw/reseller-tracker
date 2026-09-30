import fs from "fs";import path from "path";import {pool} from "../lib/db";
(async()=>{await pool.query("CREATE TABLE IF NOT EXISTS schema_migrations(name text PRIMARY KEY)");
for(const f of fs.readdirSync("migrations").sort()){const r=await pool.query("SELECT 1 FROM schema_migrations WHERE name=$1",[f]);if(r.rowCount)continue;
await pool.query(fs.readFileSync(path.join("migrations",f),"utf8"));await pool.query("INSERT INTO schema_migrations VALUES($1)",[f]);console.log("applied",f);}
await pool.end();})().catch(e=>{console.error(e);process.exit(1)});
