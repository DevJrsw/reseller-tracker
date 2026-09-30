"use client";
export default function Confirm({action,id,label,msg,cls="btn-ghost"}:{action:any;id:string;label:string;msg:string;cls?:string}){
 return <form action={action} onSubmit={e=>{if(!confirm(msg))e.preventDefault()}}><input type="hidden" name="id" value={id}/><button className={cls}>{label}</button></form>}
