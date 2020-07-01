import { Get, JsonController, UseBefore, Res, Req, Post, Body } from 'routing-controllers';
import {CheckOutItem, CheckOutRequest} from '@Shared/api/Requests';
import { SuccessResponse, GetItemsResponse } from '@Shared/api/Responses';
import RequestService from '@Services/RequestService';

@JsonController('/checkOut')
export default class RequestController {
  constructor(private RequestService: RequestService) {}

  @Post()
  async createCheckOutRequest(@Body() body: CheckOutRequest): Promise<SuccessResponse>{
    await this.RequestService.createCheckOutRequest({...body} as CheckOutRequest);
    return SuccessResponse.Positive;
  }

  @Post('/checkOutItems')
  async createCheckOutItem(@Body() body: CheckOutItem): Promise<SuccessResponse>{
    await this.RequestService.createCheckOutItem({...body} as CheckOutItem);
    return SuccessResponse.Positive;
  }

  @Get('/items')
  async getItems(): Promise<GetItemsResponse>{
    return await this.RequestService.getAllItemsForRent();
  }
}