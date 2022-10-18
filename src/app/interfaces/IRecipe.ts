import { IStatus } from "./IStatus";

export interface IRecipe {
  id: number;
  name: string;
  description: string;
  statusData: IStatus;
  image: string;
  comments: string;
  incidents: string;
}
