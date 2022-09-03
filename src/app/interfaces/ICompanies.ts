import { IStatus } from "./IStatus";
import { ISupplier } from "./ISupplier";

export interface ICompany {
  id: number;
  rif: string;
  name: string;
  comercialName: string;
  statusData: IStatus;
  suppliersOfCompany: ISupplier[];
}
