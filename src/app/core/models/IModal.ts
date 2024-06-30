import { IPare } from "./IPare";

export interface IModal{
    group_id:number,
    date: string,
    number: number,
    pares: IPare[]
}