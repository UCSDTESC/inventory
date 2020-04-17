import { Get, JsonController, UseBefore, Res, Req, Post, Body, UploadedFile } from 'routing-controllers';
import AdminAuthorisation from '../../middleware/AdminAuthorization';
import { GetItemsResponse, SuccessResponse } from '@Shared/api/Responses'; 
import { CreateItemRequest } from '@Shared/api/Requests';
import ItemService from '@Services/ItemService';
import CloudStorageService from '@Services/CloudStorageService';
import { InventoryItem } from '@Shared/Types';
import { FirebaseUID } from 'api/decorators/FirebaseUID';
import { Parser } from 'json2csv';
import * as csv from 'fast-csv';
import { auth } from 'firebase-admin';
import { Response } from 'express';
import Uploads from '@Config/Uploads';


@JsonController('/items')
@UseBefore(AdminAuthorisation)
export default class ItemsController {
  constructor(private ItemService: ItemService, private CloudStorageService: CloudStorageService) {}
  
  @Get()
  async getItems(): Promise<GetItemsResponse> {
    return await this.ItemService.getAllItems();
  }

  @Post()
  async createItem(
    @Body() body: CreateItemRequest, 
    @FirebaseUID() uid: string,
    @UploadedFile('picture', {options: Uploads, required: false}) picture: Express.Multer.File,
    @UploadedFile('receipt', {options: Uploads, required: false}) receipt: Express.Multer.File
  ): Promise<SuccessResponse> {
    let pictureUrl: string = '';
    let receiptUrl: string = '';

    try {
      pictureUrl = (await this.CloudStorageService.uploadImage(picture, true))[0];  
    } catch (e) {
      //TODO: Handle what to do when image upload fails - go ahead with request or respond with error?
    }

    try {
      receiptUrl = (await this.CloudStorageService.uploadImage(receipt, true))[0];  
    } catch (e) {
      //TODO: Handle what to do when image upload fails - go ahead with request or respond with error?
    }

    const res = await this.ItemService.createItem({
      ...body, 
      createdBy: uid, 
      pictureUrl,
      receiptUrl,
    } as InventoryItem);
    
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