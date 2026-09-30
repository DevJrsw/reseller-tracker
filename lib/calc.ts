export type Money=number|string|null|undefined;
const n=(v:Money)=>Number(v??0)||0;
/** Profit = sold price - fees - shipping - purchase cost. Null unless the item is sold. */
export function profit(i:{status:string;sold_price:Money;fees:Money;shipping_cost:Money;purchase_price:Money}):number|null{
 if(i.status!=="Sold"||i.sold_price==null)return null;
 return Math.round((n(i.sold_price)-n(i.fees)-n(i.shipping_cost)-n(i.purchase_price))*100)/100;}
export const gbp=(v:Money)=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"}).format(n(v));
export const STATUSES=["Draft","In Stock","Listed","Sold","Returned","Archived"] as const;
