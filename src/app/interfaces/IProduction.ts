import { IConcilation } from "./IConcilation";
import { IStatus } from "./IStatus";

export interface IProduction {
  id: number;
  quantity: number;
  stockProduction: number;
  name: string;
  comments: string;
  conciliationsData: IConcilation[];
  statusData: IStatus;
  createdDate: string;
}
