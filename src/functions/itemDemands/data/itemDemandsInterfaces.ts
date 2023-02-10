export interface IItemDemandRegister {
  id?: number;
  group: string;
  amount: string;
  justify: string;
}

export interface IItemDemandRequest {
  lenght: number;
  itemDemands: IItemDemandRegister[];
}

export default function empty() {
  return "";
}
