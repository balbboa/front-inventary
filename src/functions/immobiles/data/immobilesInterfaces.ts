export interface IImmobileRegister {
  id?: number;
  name: string;
  place: string;
  district: string;
  city: string;
  latitude: string;
  longitude: string;
  opmsId: string;
}

export interface IImmobileRequest {
  lenght: number;
  immobiles: IImmobileRegister[];
}

export default function empty() {
  return "";
}
