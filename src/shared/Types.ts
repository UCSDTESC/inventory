export type InventoryItem = {
  name: string;
  updatedAt: string;
  createdAt: string;
  createdBy: string;
  forRent: boolean;
  quantity: number;
  description?: string;
  url?: string;
  serials?: Array<string>;
  price?: string;
  receipt?: string;
  picture?: string;
  tags?: Array<string>
}