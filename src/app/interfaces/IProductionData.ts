import { IDispatch } from "./IDispacht";
import { IRecipe } from "./IRecipe";

export interface IProductionData {
  id: number;
  quantity: number;
  stockProduction: number;
  name: string;
  comments: string;
  image: string;
  dispatchData: IDispatch,
  recipeData: IRecipe
}
