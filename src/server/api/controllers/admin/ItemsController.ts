import { Get, JsonController, UseBefore, Res, Req, Post } from 'routing-controllers';
import AdminAuthorisation from '../../middleware/AdminAuthorization';
import { GetItemsResponse } from '@Shared/api/Responses'; 


@JsonController('/items')
@UseBefore(AdminAuthorisation)
export default class ItemsController {
  constructor() {}
  
  @Get()
  getItems(): GetItemsResponse {
    return {items: Array(5).fill({
      name: 'Label Printer',
      updatedAt: new Date().toTimeString(),
      createdAt: new Date().toTimeString(),
      createdBy: 'me',
      forRent: true,
      quantity: 1
    })}
  }
}