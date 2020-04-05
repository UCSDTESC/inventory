import { Get, JsonController, UseBefore, Res, Req, Post, Body } from 'routing-controllers';
import AdminAuthorisation from '../../middleware/AdminAuthorization';
import { GetItemsResponse, SuccessResponse } from '@Shared/api/Responses'; 
import { CreateItemRequest } from '@Shared/api/Requests';
import ItemService from '@Services/ItemService';
import { InventoryItem } from '@Shared/Types';
import { FirebaseUID } from 'api/decorators/FirebaseUID';
import { Parser } from 'json2csv';
import * as csv from 'fast-csv';
import { auth } from 'firebase-admin';
import { Response } from 'express';


@JsonController('/items')
@UseBefore(AdminAuthorisation)
export default class ItemsController {
  constructor(private ItemService: ItemService) {}
  
  @Get()
  async getItems(): Promise<GetItemsResponse> {
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

  @Get('/export')
  async exportItems(@Res() res: Response) {
    let {items} = await this.ItemService.getAllItems();
    const parser = new Parser<InventoryItem>();

    const csv = parser.parse(items.map<any>(i => ({
      ...i,
      createdBy: (i.createdBy as auth.UserRecord)?.uid ?? i.createdBy,
      createdAt: i.createdAt?.toDate().toISOString()
    })));
    
    const filename = `tesc-inventory-${new Date().toTimeString()}.csv`;

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'text/csv');
    
    return res.send(csv);
  }
}