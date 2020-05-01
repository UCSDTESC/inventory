import axios from 'axios'
import { ADMIN_API_PREFIX, } from '@Shared/api/Paths';
import { GetItemsResponse } from '@Shared/api/Responses';
import { CreateItemRequest } from '@Shared/api/Requests';
import * as firebase from 'firebase';
import { InventoryItem } from '~/../shared/Types';

export const client = axios.create({baseURL: ADMIN_API_PREFIX});

export const getItems = () => 
  client
    .get<GetItemsResponse>('/items')

export const createItem = (body: CreateItemRequest) =>
  client
    .post<CreateItemRequest>('/items/create', body)

export const removeItem = (itemId: string) =>
  client
    .delete<string>('/items/remove/' + itemId)

export const getItemTags = () =>
  client
    .get<Array<string>>('/items/tags')
  
export const getItemCSV = () => 
  client
    .get<string>('/items/export');