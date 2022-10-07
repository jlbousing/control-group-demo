export interface IItem {
  id: number;
  subcategoryId: number;
  name: string;
  quantity: number;
  unit: string;
  comments: string | null;
  incidents: string | null;
  createdDate: string;
  modifyDate: string;
}
