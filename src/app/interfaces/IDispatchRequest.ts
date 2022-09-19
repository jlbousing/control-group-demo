export interface IDispatchRequest {
  guideNumber: number;
  noteNumber: number;
  productionId: number;
  destination: string;
  dispatchQuantity: number;
  userId: number;
  partial: boolean;
  onHold: boolean;
  comments: string;
}
