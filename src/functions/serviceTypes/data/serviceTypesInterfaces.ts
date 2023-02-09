export interface IServiceTypeRegister {
  id?: number;
  name: string;
}

export interface IServiceTypeRequest {
  lenght: number;
  serviceTypes: IServiceTypeRegister[];
}

export default function empty() {
  return "";
}
