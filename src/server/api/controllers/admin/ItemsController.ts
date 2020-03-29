import { Get, JsonController, UseBefore, Res, Req, Post } from 'routing-controllers';
import AdminAuthorisation from '../../middleware/AdminAuthorization';
import { GetItemsResponse } from '@Shared/api/Responses'; 


@JsonController('/items')
@UseBefore(AdminAuthorisation)
export default class ItemsController {
  constructor() {}
  
  @Get()
  getItems(): GetItemsResponse {
    return {items: ['a', 'b', 'c']}
  }
}