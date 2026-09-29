import Link from "next/link";import {requireUser} from "@/lib/session";import {listItems} from "@/lib/items";import {gbp,profit,STATUSES} from "@/lib/calc";
import {archiveItem,deleteItem,importCsv} from "../../actions";import Confirm from "./Confirm";
export const dynamic="force-dynamic";
export default async function P({searchParams:sp}:{searchParams:{q?:string;status?:string;sort?:string;error?:string;imported?:string}}){
 const items=await listItems(await requireUser(),sp);
 return <div className="space-y-4"><h1 className="text-2xl font-semibold">Inventory</h1>
 {sp.error&&<p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">{sp.error}</p>}
 {sp.imported&&<p role="status" className="rounded-lg bg-green-50 p-3 text-green-800">Imported {sp.imported} items.</p>}
 <form className="card grid gap-3 md:grid-cols-4" role="search">
  <div className="md:col-span-2"><label htmlFor="q" className="sr-only">Search</label><input id="q" name="q" defaultValue={sp.q} placeholder="Search name, SKU, category…" className="input"/></div>
  <div><label htmlFor="status" className="sr-only">Status</label><select id="status" name="status" defaultValue={sp.status??""} className="input"><option value="">All statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>
  <div className="flex gap-2"><select name="sort" aria-label="Sort" defaultValue={sp.sort??"date"} className="input"><option value="date">Newest</option><option value="name">Name</option><option value="price">Cost</option></select><button className="btn">Go</button></div></form>
 <div className="flex flex-wrap gap-2"><a href="/api/export" className="btn-ghost">Export CSV</a>
  <form action={importCsv} className="flex gap-2"><label className="sr-only" htmlFor="file">CSV file</label><input id="file" type="file" name="file" accept=".csv" className="input"/><button className="btn-ghost">Import</button></form></div>
 {!items.length?<div className="card py-10 text-center text-slate-600">No items found. <Link className="text-brand underline" href="/inventory/new">Add one</Link> or import a CSV.</div>:
 <ul className="grid gap-3 md:grid-cols-2">{items.map((i:any)=>{const p=profit(i);return <li key={i.id} className="card space-y-2">
  <div className="flex justify-between gap-2"><Link href={`/inventory/${i.id}`} className="font-medium text-brand hover:underline">{i.name}</Link><span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{i.status}</span></div>
  <p className="text-sm text-slate-600">Cost {gbp(i.purchase_price)} · Qty {i.quantity}{i.listed_price!=null&&` · Listed ${gbp(i.listed_price)}`}{p!=null&&` · Profit ${gbp(p)}`}</p>
  <div className="flex gap-2"><Link href={`/inventory/${i.id}`} className="btn-ghost">Edit</Link><Confirm action={archiveItem} id={i.id} label="Archive" msg="Archive this item?"/><Confirm action={deleteItem} id={i.id} label="Delete" msg="Permanently delete this item?"/></div></li>})}</ul>}</div>}
