import { IStatus } from "./IStatus";
import { ICategory } from "./ICategory";

export interface ISupplier {
  id: number;
  rif: string;
  name: string;
  comercialName: string;
  statusData: IStatus;
  categoryData: ICategory;
  asignaments: number;
}
