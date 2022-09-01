import { IStatus } from "./IStatus";

export interface ICompany {
  id: number;
  rif: string;
  name: string;
  comercialName: string;
  statusData: IStatus;
  suppliersOfCompany: any[]
}
