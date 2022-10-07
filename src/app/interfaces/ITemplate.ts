import { IItem } from "./IItem";

export interface ITemplate {
  id: number;
  name: string;
  image: string | null;
  items: any[];
  status: boolean;
}
