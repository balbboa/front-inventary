export interface IModelRegister {
  id?: number;
  nome: string;
}

export interface IModelRequest {
  count: number;
  models: IModelRegister[];
}

export default function empty() {
  return "";
}
