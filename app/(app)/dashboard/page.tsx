import Link from "next/link";import {requireUser} from "@/lib/session";import {stats} from "@/lib/items";import {gbp} from "@/lib/calc";import Chart from "./Chart";
export const dynamic="force-dynamic";
export default async function P(){const s=await stats(await requireUser());
 const tiles=[["Inventory cost",gbp(s.cost)],["Est. resale value",gbp(s.resale)],["Total profit",gbp(s.profit)],["Items sold",s.sold],["Active listings",s.listed]];
 return <div className="space-y-6"><h1 className="text-2xl font-semibold">Dashboard</h1>
 <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">{tiles.map(([k,v])=><div key={k as string} className="card"><p className="text-sm text-slate-600">{k}</p><p className="mt-1 text-xl font-semibold">{v}</p></div>)}</div>
 <section className="card"><h2 className="mb-3 font-medium">Revenue &amp; profit by month</h2>{s.monthly.length?<Chart data={s.monthly}/>:<p className="text-slate-600">No sales yet. Mark an item as Sold to see charts.</p>}</section>
 <section className="card"><h2 className="mb-3 font-medium">Recent activity</h2>{s.recent.length?<ul className="divide-y">{s.recent.map((r:any)=><li key={r.id} className="flex justify-between py-2"><Link className="text-brand hover:underline" href={`/inventory/${r.id}`}>{r.name}</Link><span className="text-sm text-slate-600">{r.status}</span></li>)}</ul>:<p className="text-slate-600">Nothing yet — <Link className="text-brand underline" href="/inventory/new">add your first item</Link>.</p>}</section></div>}
