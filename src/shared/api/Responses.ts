import { InventoryItem } from '@Shared/Types';

export type GetItemsResponse = {
  items: Array<InventoryItem>
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
