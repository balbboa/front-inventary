export interface IOpmRegister {
  id?: number;
  name: string;
  sku: string;
  description: string;
}

export interface IOpmRequest {
  lenght: number;
  opms: IOpmRegister[];
}

export default function empty() {
  return "";
}
