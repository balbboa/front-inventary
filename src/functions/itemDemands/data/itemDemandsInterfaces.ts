export interface IItemDemandRegister {
  id?: number;
  groupId: string;
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
