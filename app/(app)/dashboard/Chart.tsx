"use client";
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Tooltip,Legend} from "recharts";
export default function Chart({data}:{data:any[]}){return <div className="h-64" role="img" aria-label="Monthly revenue and profit"><ResponsiveContainer><BarChart data={data}><XAxis dataKey="m"/><YAxis/><Tooltip/><Legend/><Bar dataKey="revenue" fill="#4f46e5" radius={[6,6,0,0]}/><Bar dataKey="profit" fill="#10b981" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>}
