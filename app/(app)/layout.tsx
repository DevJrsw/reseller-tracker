import Link from "next/link";import {requireUser} from "@/lib/session";import {logout} from "../actions";
export default async function L({children}:{children:React.ReactNode}){await requireUser();
 const links=[["/dashboard","Dashboard"],["/inventory","Inventory"]];
 return <div className="min-h-screen pb-20 md:pb-0"><header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between p-3">
 <span className="font-semibold text-brand">Reseller Tracker</span>
 <nav aria-label="Main" className="hidden gap-1 md:flex">{links.map(([h,l])=><Link key={h} href={h} className="rounded-lg px-3 py-2 hover:bg-slate-100">{l}</Link>)}</nav>
 <div className="flex gap-2"><Link href="/inventory/new" className="btn">+ Quick add</Link><form action={logout}><button className="btn-ghost">Log out</button></form></div></div></header>
 <main className="mx-auto max-w-6xl p-4 md:p-6">{children}</main>
 <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 flex border-t bg-white md:hidden">{links.map(([h,l])=><Link key={h} href={h} className="flex-1 py-4 text-center text-sm font-medium">{l}</Link>)}</nav></div>}
