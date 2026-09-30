import Link from "next/link";
export default function AuthForm({mode,action,error}:{mode:"login"|"signup";action:any;error?:string}){
 const s=mode==="signup";return <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center p-6">
 <h1 className="mb-1 text-2xl font-semibold">{s?"Create your account":"Welcome back"}</h1><p className="mb-6 text-slate-600">Reseller Tracker</p>
 <form action={action} className="card space-y-4">
 {error&&<p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
 <div><label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label><input id="email" name="email" type="email" required autoComplete="email" className="input"/></div>
 <div><label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label><input id="password" name="password" type="password" required minLength={8} autoComplete={s?"new-password":"current-password"} className="input"/></div>
 <button className="btn w-full">{s?"Sign up":"Log in"}</button></form>
 <p className="mt-4 text-center text-sm">{s?<>Have an account? <Link className="text-brand underline" href="/login">Log in</Link></>:<>New here? <Link className="text-brand underline" href="/signup">Sign up</Link></>}</p></main>}
