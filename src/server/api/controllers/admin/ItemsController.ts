import { Get, JsonController, UseBefore, Res, Req, Post, Body } from 'routing-controllers';
import AdminAuthorisation from '../../middleware/AdminAuthorization';
import { GetItemsResponse, SuccessResponse } from '@Shared/api/Responses'; 
import { CreateItemRequest } from '@Shared/api/Requests';
import ItemService from '@Services/ItemService';
import { InventoryItem } from '@Shared/Types';
import { FirebaseUID } from 'api/decorators/FirebaseUID';


@JsonController('/items')
@UseBefore(AdminAuthorisation)
export default class ItemsController {
  constructor(private ItemService: ItemService) {}
  
  @Get()
  async getItems(): Promise<GetItemsResponse|SuccessResponse> {
    return await this.ItemService.getAllItems();
  }

  @Post()
  async createItem(@Body() body: CreateItemRequest, @FirebaseUID() uid: string): Promise<SuccessResponse> {
    await this.ItemService.createItem({...body, createdBy: uid} as InventoryItem);
    return SuccessResponse.Positive
  }

  @Get('/tags')
  async getItemTags(): Promise<Array<string>> {
    return await this.ItemService.getItemTags();
  }
}