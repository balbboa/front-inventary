export interface IServiceDemandRegister {
  id?: number;
  serviceTypeId: string;
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
