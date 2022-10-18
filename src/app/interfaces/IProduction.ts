import { IConcilation } from "./IConcilation";
import { IStatus } from "./IStatus";
import { IRecipe } from "./IRecipe";

export interface IProduction {
  id: number;
  quantity: number;
  stockProduction: number;
  name: string;
  comments: string;
  conciliationsData: IConcilation[];
  recipeData: IRecipe;
  statusData: IStatus;
  incidents: string;
  createdDate: string;
  image: string;
}
