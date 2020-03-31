import { Get, JsonController, UseBefore, Res, Req, Post, Body } from 'routing-controllers';
import AdminAuthorisation from '../../middleware/AdminAuthorization';
import { GetItemsResponse, SuccessResponse } from '@Shared/api/Responses'; 
import { CreateItemRequest } from '@Shared/api/Requests';
import FirebaseService from '@Services/FirebaseService';
import { InventoryItem } from '@Shared/Types';
import { FirebaseUID } from 'api/decorators/FirebaseUID';


@JsonController('/items')
@UseBefore(AdminAuthorisation)
export default class ItemsController {
  constructor(private FirebaseService: FirebaseService) {}
  
  @Get()
  async getItems(): Promise<GetItemsResponse|SuccessResponse> {
    return await this.FirebaseService.getAllItems();
  }

  @Post()
  async createItem(@Body() body: CreateItemRequest, @FirebaseUID() uid: string): Promise<SuccessResponse> {
    await this.FirebaseService.createItem({...body, createdBy: uid} as InventoryItem);
    return SuccessResponse.Positive
  }
}