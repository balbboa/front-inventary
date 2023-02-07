export interface IOpmRegister {
  id?: number;
  name: string;
  acronym: string;
}

export interface IOpmRequest {
  lenght: number;
  opms: IOpmRegister[];
}

export default function empty() {
  return "";
}
