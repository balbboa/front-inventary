export interface IManufacturerRegister {
  id?: number;
  name: string;
}

export interface IManufacturerRequest {
  lenght: number;
  manufacturers: IManufacturerRegister[];
}

export default function empty() {
  return "";
}
