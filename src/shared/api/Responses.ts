import { InventoryItem } from '@Shared/Types';
import { CheckOutRequest } from './Requests';

export type GetItemsResponse = {
  items: Array<InventoryItem>
}

export type GetRequestsResponse = {
  requests: Array<CheckOutRequest>
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
