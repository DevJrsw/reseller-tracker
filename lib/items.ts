import {pool} from "./db";
// Every query is scoped by user_id — this is the access-control boundary.
export async function listItems(uid:string,o:{q?:string;status?:string;sort?:string}={}){
 const p:any[]=[uid];let w="user_id=$1";
 if(o.q){p.push(`%${o.q}%`);w+=` AND (name ILIKE $${p.length} OR sku ILIKE $${p.length} OR category ILIKE $${p.length})`}
 if(o.status){p.push(o.status);w+=` AND status=$${p.length}`}
 const s=({name:"name",price:"purchase_price DESC",date:"created_at DESC"} as any)[o.sort??"date"]??"created_at DESC";
 return (await pool.query(`SELECT * FROM items WHERE ${w} ORDER BY ${s}`,p)).rows;}
export async function getItem(uid:string,id:string){
 if(!/^[0-9a-f-]{36}$/i.test(id))return null;
 return (await pool.query("SELECT * FROM items WHERE id=$1 AND user_id=$2",[id,uid])).rows[0]??null;}
export async function stats(uid:string){
 const q=async(sql:string)=>(await pool.query(sql,[uid])).rows;
 const [a]=await q(`SELECT
  COALESCE(SUM(purchase_price*quantity) FILTER(WHERE status IN('Draft','In Stock','Listed')),0) cost,
  COALESCE(SUM(COALESCE(listed_price,0)*quantity) FILTER(WHERE status IN('In Stock','Listed')),0) resale,
  COALESCE(SUM(sold_price-fees-shipping_cost-purchase_price) FILTER(WHERE status='Sold'),0) profit,
  COUNT(*) FILTER(WHERE status='Sold') sold, COUNT(*) FILTER(WHERE status='Listed') listed FROM items WHERE user_id=$1`);
 const monthly=await q(`SELECT to_char(date_trunc('month',sold_date),'Mon YY') m, SUM(sold_price)::float revenue, SUM(sold_price-fees-shipping_cost-purchase_price)::float profit, COUNT(*)::int sales
  FROM items WHERE user_id=$1 AND status='Sold' AND sold_date IS NOT NULL GROUP BY date_trunc('month',sold_date) ORDER BY date_trunc('month',sold_date)`);
 const recent=await q(`SELECT id,name,status,updated_at FROM items WHERE user_id=$1 ORDER BY updated_at DESC LIMIT 5`);
 return {...a,monthly,recent};}
