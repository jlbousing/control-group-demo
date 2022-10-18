import { IItem } from "./IItem";

export interface IRubro {
  id: number;
  subcategoryId: number;
  name: string;
  incidents: string;
  itemValues: IItem[];
}
