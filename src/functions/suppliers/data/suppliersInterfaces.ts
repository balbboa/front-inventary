export interface ISupplierRegister {
  id?: number;
  name: string;
  serviceTypeId: string;
}

export interface ISupplierRequest {
  lenght: number;
  suppliers: ISupplierRegister[];
}

export default function empty() {
  return "";
}
