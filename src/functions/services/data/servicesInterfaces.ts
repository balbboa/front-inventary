export interface IServiceRegister {
  id?: number;
  lineNumber: string;
  contractNumber: string;
  obs: string;
  statusId: string;
  immobileId: string;
  supplierId: string;
}

export interface IServiceRequest {
  lenght: number;
  services: IServiceRegister[];
}

export default function empty() {
  return "";
}
