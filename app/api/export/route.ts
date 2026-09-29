import {currentUserId} from "@/lib/session";import {listItems} from "@/lib/items";import {toCsv} from "@/lib/csv";
export const dynamic="force-dynamic";
export async function GET(){const uid=await currentUserId();if(!uid)return new Response("Unauthorised",{status:401});
 return new Response(toCsv(await listItems(uid)),{headers:{"content-type":"text/csv","content-disposition":'attachment; filename="inventory.csv"'}});}
