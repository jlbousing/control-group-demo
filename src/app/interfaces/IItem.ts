interface IItemData {
  name: string;
}

export interface IItem {
  id: number;
  brandName: string;
  volume: number;
  measure: string;
  comments: string;
  itemData: IItemData
}
