export interface IConcilation {
  id: number;
  asignamentQuantity: number;
  productionQuantity: number;
  dispatchQuantity: number;
  compilanceProductionPercentage: number;
  compilanceDispatchPercentage: number;
  name: string;
  comments: string;
  status: number;
}
