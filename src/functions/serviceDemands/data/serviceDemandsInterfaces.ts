export interface IServiceDemandRegister {
  id?: number;
  serviceType: string;
  amount: string;
  justify: string;
}

export interface IServiceDemandRequest {
  lenght: number;
  serviceDemands: IServiceDemandRegister[];
}

export default function empty() {
  return "";
}
