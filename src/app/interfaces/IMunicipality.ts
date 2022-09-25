import { IParish } from "./IParish";

export interface IMunicipality {
  id: number;
  name: string;
  status: boolean;
  parishData: IParish[];
}
