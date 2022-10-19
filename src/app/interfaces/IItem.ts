interface IItemData {
  id: number;
  name: string;
  comments: string;
  incidents: string;
}

export interface IItem {
  id: number;
  brandName: string;
  volume: number;
  measure: string;
  comments: string;
  itemData: IItemData
}
