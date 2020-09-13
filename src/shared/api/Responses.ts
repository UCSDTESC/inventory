import { InventoryItem } from '@Shared/Types';
import { CheckOutItem } from './Requests';

export type GetItemsResponse = {
  items: Array<InventoryItem>
}

export type GetCheckOutItemResponse = { 
  checkOutItems: CheckOutItem
}

export class SuccessResponse {
  static Positive: SuccessResponse = {
    success: true,
  };

  static Negative: SuccessResponse = {
    success: false,
  };

  success: boolean;
}
