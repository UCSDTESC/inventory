import { InventoryItem } from '@Shared/Types';

export type CreateItemRequest = Pick<InventoryItem, 
  'name' 
  | 'description' 
  | 'forRent'
  | 'quantity'
  | 'tags'
>