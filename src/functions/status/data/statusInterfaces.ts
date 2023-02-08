export interface IStatusRegister {
  id?: number;
  name: string;
}

export interface IStatusRequest {
  lenght: number;
  status: IStatusRegister[];
}

export default function empty() {
  return "";
}
