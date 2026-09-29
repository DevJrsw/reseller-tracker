export const COLS=["name","category","sku","purchase_date","purchase_price","source","condition","quantity","photo_urls","platform","listing_date","listed_price","sold_date","sold_price","fees","shipping_cost","status","notes"];
const esc=(v:any)=>{const s=v==null?"":v instanceof Date?v.toISOString().slice(0,10):String(v);return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s};
export const toCsv=(rows:any[])=>[COLS.join(","),...rows.map(r=>COLS.map(c=>esc(r[c])).join(","))].join("\n");
export function parseCsv(t:string):Record<string,string>[]{const rows:string[][]=[];let r:string[]=[],c="",q=false;
 for(let i=0;i<t.length;i++){const ch=t[i];
  if(q){if(ch=='"'&&t[i+1]=='"'){c+='"';i++}else if(ch=='"')q=false;else c+=ch}
  else if(ch=='"')q=true;else if(ch==","){r.push(c);c=""}
  else if(ch=="\n"||ch=="\r"){if(ch=="\r"&&t[i+1]=="\n")i++;r.push(c);c="";if(r.some(x=>x))rows.push(r);r=[]}else c+=ch}
 if(c||r.length){r.push(c);rows.push(r)}
 const [h,...b]=rows;return b.map(x=>Object.fromEntries(h.map((k,i)=>[k.trim(),x[i]??""])));}
