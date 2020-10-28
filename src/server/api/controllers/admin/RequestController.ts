import { Get, JsonController, UseBefore, Res, Req, Post, Body } from 'routing-controllers';
import AdminAuthorisation from '../../middleware/AdminAuthorization';
import { GetItemsResponse, SuccessResponse, GetRequestsResponse } from '@Shared/api/Responses'; 
import { CreateItemRequest } from '@Shared/api/Requests';
import RequestService from '@Services/RequestService';
import CloudStorageService from '@Services/CloudStorageService';
import { InventoryItem } from '@Shared/Types';
import { FirebaseUID } from 'api/decorators/FirebaseUID';
import { Parser } from 'json2csv';
import { auth } from 'firebase-admin';
import { Response, Request } from 'express';
import Uploads from '@Config/Uploads';

@JsonController('/request')
export default class RequestController {
  constructor(private RequestService: RequestService, private CloudStorageService: CloudStorageService) {}

  @Get()
  async getRequests(): Promise<GetRequestsResponse> {
    return await this.RequestService.getAllRequests();
  }
}
