import { IStatus } from "./IStatus";

export interface IInquiryCompany {
  id: number;
  rif: string;
  name: string;
  comercialName: string;
  record: number;
  status: number;
  statusData: IStatus
  suppliersOfCompany: any[];
}
