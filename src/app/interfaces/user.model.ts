import { IStatus } from "./IStatus";
import { IRol } from "./IRol";

export interface IUser {
  id: number;
  lastIp: string;
  name: string;
  username: string;
  email: string;
  dni: number;
  phone: string;
  session: string;
  statusData: IStatus;
  rolData: IRol;
  sessionDate: string;
  modifyDate: string;
  createdDate: string;
}
