import { Get, JsonController, UseBefore, Res, Req, Param, Post, Body, Delete } from 'routing-controllers';
import AdminAuthorisation from '../../middleware/AdminAuthorization';
import { GetCheckOutItemResponse, GetItemsResponse, SuccessResponse } from '@Shared/api/Responses'; 
import { CreateItemRequest } from '@Shared/api/Requests';
import ItemService from '@Services/ItemService';
import CloudStorageService from '@Services/CloudStorageService';
import { InventoryItem } from '@Shared/Types';
import { FirebaseUID } from 'api/decorators/FirebaseUID';
import { Parser } from 'json2csv';
import { auth } from 'firebase-admin';
import { Response, Request } from 'express';
import Uploads from '@Config/Uploads';

@JsonController('/items')
@UseBefore(AdminAuthorisation)
export default class ItemsController {
  constructor(private ItemService: ItemService, private CloudStorageService: CloudStorageService) {}
  
  @Get()
  async getItems(): Promise<GetItemsResponse> {
    return await this.ItemService.getAllItems();
  }

  @Get('/:checkOutItemId') 
  async getLogs(@Param('checkOutItemId') checkOutItemId: string): Promise<GetCheckOutItemResponse> { 
    return await this.ItemService.getLogInfo(checkOutItemId); 
  }

  @Delete('/remove/:id')
  async removeItem(@Param("id") itemId: string, @FirebaseUID() uid: string): Promise<SuccessResponse> {
    try{
      await this.CloudStorageService.deleteImages(itemId);
      await this.ItemService.removeItem(itemId);
    } catch (e) {
      // Respond with error when image removal fails because:
      // 1. image deletion failed -> item doesn't get deleted, it's fine to redelete
      // 2. item deletion failed -> images already deleted, it's fine to recall delete on the image storage
      return SuccessResponse.Negative
    }
    return SuccessResponse.Positive
  }

  @Post()
  @UseBefore(Uploads.fields([{name: 'picture', maxCount: 1}, {name: 'receipt', maxCount: 1}]))
  async createItem(
    @Body() body: CreateItemRequest, 
    @FirebaseUID() uid: string,
    @Req() req: Request
  ): Promise<SuccessResponse> {
    let pictureUrl: string = '';
    let receiptUrl: string = '';

    const picture: Express.Multer.File = req.files['picture'][0];
    const receipt: Express.Multer.File = req.files['receipt'][0];

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