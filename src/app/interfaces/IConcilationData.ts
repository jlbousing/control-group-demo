import { IProductionData } from "./IProductionData";
import { IAssignament } from "./IAssignament";
import { ISupplier } from "./ISupplier";

export interface IConciliationData {
  id: number;
  asignamentQuantity: number;
  productionQuantity: number;
  dispatchQuantity: number;
  compilanceProductionPercentage: number;
  compilanceDispatchPercentage: number;
  name: string;
  comments: string;
  productionData: IProductionData;
  asignamentData: IAssignament;
  supplierData: ISupplier;
}
