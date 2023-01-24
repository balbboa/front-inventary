export interface IModelRegister {
  id?: number;
  nome: string;
}

export interface IModelRequest {
  lenght: number;
  models: IModelRegister[];
}

export default function empty() {
  return "";
}
