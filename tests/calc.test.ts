import {describe,it,expect} from "vitest";import {profit} from "../lib/calc";import {parseCsv,toCsv} from "../lib/csv";import {itemSchema} from "../lib/schema";
describe("profit",()=>{
 it("subtracts cost, fees and shipping",()=>expect(profit({status:"Sold",sold_price:"75",fees:"6",shipping_cost:"4",purchase_price:"30"})).toBe(35));
 it("is null when unsold",()=>expect(profit({status:"Listed",sold_price:null,fees:0,shipping_cost:0,purchase_price:10})).toBeNull());});
describe("validation",()=>{
 it("requires a name",()=>expect(itemSchema.safeParse({name:"",status:"Draft"}).success).toBe(false));
 it("rejects negative prices",()=>expect(itemSchema.safeParse({name:"x",status:"Draft",purchase_price:"-1"}).success).toBe(false));
 it("accepts a minimal item",()=>expect(itemSchema.safeParse({name:"x",status:"Draft"}).success).toBe(true));});
describe("csv",()=>it("round-trips quoted values",()=>{const c=toCsv([{name:'A "b", c',status:"Sold"}]);expect(parseCsv(c)[0].name).toBe('A "b", c')}));
