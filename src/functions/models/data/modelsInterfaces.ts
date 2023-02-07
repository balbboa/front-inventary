export interface IModelRegister {
  id?: number;
  name: string;
  sku: string;
  description: string;
  manufacturersId: string;
  groupId: string;
}

export interface IModelRequest {
  lenght: number;
  models: IModelRegister[];
}

export default function empty() {
  return "";
}
