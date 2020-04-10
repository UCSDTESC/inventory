import axios from 'axios'
import { ADMIN_API_PREFIX, } from '@Shared/api/Paths';
import { GetItemsResponse } from '@Shared/api/Responses';
import { CreateItemRequest } from '@Shared/api/Requests';
import { NewItemFormData } from '~/pages/NewItemPage/components/NewItemForm';

export const client = axios.create({baseURL: ADMIN_API_PREFIX});

export const getItems = () => 
  client
    .get<GetItemsResponse>('/items')

export const createItem = (body: NewItemFormData) => {
  const data = new FormData();

  data.set('name', body.name)  
  data.set('description', body.description)  
  data.set('forRent', body.forRent.toString());
  data.set('quantity', body.quantity.toString());
  data.set('tags', body.tags.toString());

  if (body.picture) {
    data.append('picture', body.picture);
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