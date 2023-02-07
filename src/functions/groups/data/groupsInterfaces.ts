export interface IGroupRegister {
  id?: number;
  name: string;
}

export interface IGroupRequest {
  lenght: number;
  groups: IGroupRegister[];
}

export default function empty() {
  return "";
}
