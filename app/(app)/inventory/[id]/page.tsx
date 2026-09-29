import {notFound} from "next/navigation";import {requireUser} from "@/lib/session";import {getItem} from "@/lib/items";import {saveItem} from "../../../actions";import {STATUSES,profit,gbp} from "@/lib/calc";
export const dynamic="force-dynamic";
const F:[string,string,string][]=[["name","Item name","text"],["category","Category","text"],["sku","SKU / reference","text"],["purchase_date","Purchase date","date"],["purchase_price","Purchase price (£)","number"],["source","Source","text"],["condition","Condition","text"],["quantity","Quantity","number"],["photo_urls","Photo URLs (comma separated)","text"],["platform","Listing platform","text"],["listing_date","Listing date","date"],["listed_price","Listed price (£)","number"],["sold_date","Sold date","date"],["sold_price","Sold price (£)","number"],["fees","Fees (£)","number"],["shipping_cost","Shipping cost (£)","number"]];
const val=(v:any,t:string)=>v==null?"":t==="date"&&v instanceof Date?v.toISOString().slice(0,10):String(v);
export default async function P({params,searchParams}:{params:{id:string};searchParams:{error?:string}}){
 const uid=await requireUser();const item=params.id==="new"?null:await getItem(uid,params.id);if(params.id!=="new"&&!item)notFound();
 const p=item?profit(item):null;
 return <div className="mx-auto max-w-2xl space-y-4"><h1 className="text-2xl font-semibold">{item?"Edit item":"Add item"}</h1>
 {searchParams.error&&<p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">{searchParams.error}</p>}
 <form action={saveItem} className="card grid gap-4 md:grid-cols-2">{item&&<input type="hidden" name="id" value={item.id}/>}
 {F.map(([k,l,t])=><div key={k} className={k==="name"?"md:col-span-2":""}><label htmlFor={k} className="mb-1 block text-sm font-medium">{l}</label>
  <input id={k} name={k} type={t} step={t==="number"?"0.01":undefined} min={t==="number"?0:undefined} required={k==="name"} defaultValue={item?val(item[k],t):k==="quantity"?"1":k==="fees"||k==="shipping_cost"?"0":""} className="input"/></div>)}
 <div><label htmlFor="status" className="mb-1 block text-sm font-medium">Status</label><select id="status" name="status" defaultValue={item?.status??"In Stock"} className="input">{STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>
 <div className="md:col-span-2"><label htmlFor="notes" className="mb-1 block text-sm font-medium">Notes</label><textarea id="notes" name="notes" rows={3} defaultValue={item?.notes??""} className="input py-2"/></div>
 <p className="md:col-span-2 text-sm text-slate-600">Calculated profit: <strong>{p==null?"— (set status to Sold with a sold price)":gbp(p)}</strong></p>
 <button className="btn md:col-span-2">Save item</button></form></div>}
