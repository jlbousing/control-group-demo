import { IStatus } from "./IStatus";
import { ICategory } from "./ICategory";
import { ICompany } from "./ICompanies";

export interface ISupplier {
  id: number;
  rif: string;
  name: string;
  comercialName: string;
  statusData: IStatus;
  categoryData: ICategory;
  companyData: ICompany;
}
