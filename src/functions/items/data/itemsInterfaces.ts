export interface IItemRegister {
  id?: number;
  serialNumber: string;
  tombNumber: string;
  imei: string;
  obs: string;
  modelsId: string;
  statusId: string;
}

export interface IItemRequest {
  lenght: number;
  items: IItemRegister[];
}

export default function empty() {
  return "";
}
