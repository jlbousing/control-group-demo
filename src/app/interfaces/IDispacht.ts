import { IProductionData } from "./IProductionData";
import { IUserData } from "./IUserData";
import { IStatus } from "./IStatus";

export interface IDispatch {
  id: number;
  guideNumber: number;
  dispatchQuantity: number;
  destination: string;
  comments: string;
  productionData: IProductionData;
  userData: IUserData;
  statusData: IStatus;
  incidents: string;
  registrationNumber: string;
}
