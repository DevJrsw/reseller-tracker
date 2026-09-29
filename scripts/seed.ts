import bcrypt from "bcryptjs";import {pool} from "../lib/db";
(async()=>{const h=await bcrypt.hash("demo1234!",12);
const u=await pool.query("INSERT INTO users(email,password_hash) VALUES('demo@example.com',$1) ON CONFLICT(email) DO UPDATE SET password_hash=$1 RETURNING id",[h]);const id=u.rows[0].id;
await pool.query("DELETE FROM items WHERE user_id=$1",[id]);
const rows:any[][]=[["Nike Air Max","Shoes","In Stock",20,null,null,0,0],["Levi's 501 Jeans","Clothing","Listed",8,25,null,0,0],["Vintage Camera","Electronics","Sold",30,75,70,6,4],["LEGO Set 75192","Toys","Sold",120,210,205,22,8],["Denim Jacket","Clothing","Draft",12,null,null,0,0]];
for(const [n,c,s,p,l,so,f,sh] of rows){const d=s==="Sold"?new Date(Date.now()-Math.random()*90*864e5).toISOString().slice(0,10):null;
await pool.query("INSERT INTO items(user_id,name,category,status,purchase_price,listed_price,sold_price,sold_date,fees,shipping_cost,platform) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'Vinted')",[id,n,c,s,p,l,so,d,f,sh]);}
console.log("Seeded demo@example.com / demo1234!");await pool.end();})();
