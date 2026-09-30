import {z} from "zod";import {STATUSES} from "./calc";
const opt=z.string().trim().transform(v=>v===""?null:v).nullable().optional();
const money=z.preprocess(v=>v===""||v==null?null:Number(v),z.number().min(0,"Must be 0 or more").nullable());
const date=z.string().trim().transform(v=>v===""?null:v).pipe(z.string().regex(/^\d{4}-\d{2}-\d{2}$/,"Use YYYY-MM-DD").nullable()).nullable().optional();
export const itemSchema=z.object({
 name:z.string().trim().min(1,"Item name is required").max(200),category:opt,sku:opt,purchase_date:date,
 purchase_price:money.transform(v=>v??0),source:opt,condition:opt,
 quantity:z.preprocess(v=>v===""||v==null?1:Number(v),z.number().int().min(1,"Quantity must be at least 1")),
 photo_urls:opt,platform:opt,listing_date:date,listed_price:money,sold_date:date,sold_price:money,
 fees:money.transform(v=>v??0),shipping_cost:money.transform(v=>v??0),
 status:z.enum(STATUSES),notes:opt});
