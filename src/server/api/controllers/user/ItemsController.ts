import { Get, JsonController, UseBefore, Res, Req, Post, Body } from 'routing-controllers';
import { CheckOutRequest } from '@Shared/api/Requests';
import { FirebaseUID } from 'api/decorators/FirebaseUID';
import { SuccessResponse } from '@Shared/api/Responses';
import UserService from '@Services/UserService';

@JsonController('/checkOut')
export default class ItemsController {
  constructor(private UserService: UserService) {}

  @Post()
  async createCheckOutRequest(@Body() body: CheckOutRequest): Promise<SuccessResponse>{
    await this.UserService.createCheckOutRequest({...body} as CheckOutRequest);
    return SuccessResponse.Positive;
  }
}