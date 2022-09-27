export interface IDispatchRequest {
  guideNumber: string;
  noteNumber: string;
  productionId: number;
  destination: string;
  dispatchQuantity: number;
  userId: number;
  partial: boolean;
  onHold: boolean;
  comments: string;
  incidents: string;
  registrationNumber: string;
}
