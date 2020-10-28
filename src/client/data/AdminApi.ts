import axios from 'axios'
import { ADMIN_API_PREFIX, } from '@Shared/api/Paths';
import { GetItemsResponse, GetRequestsResponse } from '@Shared/api/Responses';
import { CreateItemRequest } from '@Shared/api/Requests';
import * as firebase from 'firebase';
import { InventoryItem } from '~/../shared/Types';
import { NewItemFormData } from '~/pages/NewItemPage/components/NewItemForm';

export const client = axios.create({baseURL: ADMIN_API_PREFIX});

export const getItems = () => 
  client
    .get<GetItemsResponse>('/items')

export const getRequests = () =>
  client
    .get<GetRequestsResponse>('/requests')

export const removeItem = (itemId: string) =>
  client
    .delete<string>('/items/remove/' + itemId)

export const createItem = (body: NewItemFormData) => {
  const data = new FormData();

  data.append('name', body.name)  
  data.append('description', body.description)  
  data.append('forRent', body.forRent.toString());
  data.append('quantity', body.quantity.toString());
  body.tags.forEach(tag => data.append('tags[]', tag));
  body.serials.forEach(serial => data.append('serials[]', serial));

  if (body.picture) {
    data.append('picture', body.picture);
  } 

  if (body.receipt) {
    data.append('receipt', body.receipt);
  } 

  return client
    .post<CreateItemRequest>('/items', data)
}

export const getItemTags = () =>
  client
    .get<Array<string>>('/items/tags')
  
export const getItemCSV = () => 
  client
    .get<string>('/items/export');
