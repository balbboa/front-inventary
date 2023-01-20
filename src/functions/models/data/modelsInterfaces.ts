export interface IModelRegister {
  id?: number;
  name: string;
}

export interface IModelRequest {
  count: number;
  models: IModelRegister[];
}

export default function empty() {
  return "";
}
