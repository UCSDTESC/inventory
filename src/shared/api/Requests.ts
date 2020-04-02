import { InventoryItem } from '@Shared/Types';

export type CreateItemRequest = {
  name: string;
  description: string;
  forRent: boolean;
  quantity: number;
  tags: Array<string>;
}