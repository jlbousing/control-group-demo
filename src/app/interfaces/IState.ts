import { IMunicipality } from "./IMunicipality";

export interface IState  {
  id: number;
  status: boolean;
  name: string;
  municipalities: IMunicipality[];
}
