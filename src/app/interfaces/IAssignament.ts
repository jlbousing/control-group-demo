import { ISubcategory } from "./ISubcategory";
import { ISupplier } from "./ISupplier";
import { IStatus } from "./IStatus";

export interface IAssignament {
  id: number;
  name: string;
  description: string;
  comments: string;
  recipes: any[];
  record: number;
  recordStock: number;
  subcategoryData: ISubcategory;
  supplierData: ISupplier;
  statusData: IStatus;
  special: boolean;
}
