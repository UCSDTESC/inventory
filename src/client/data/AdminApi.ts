import axios from 'axios'
import { ADMIN_API_PREFIX, } from '@Shared/api/Paths';
import { GetItemsResponse } from '@Shared/api/Responses';

export const client = axios.create({baseURL: ADMIN_API_PREFIX});

export const getItems = () => 
  client
    .get<GetItemsResponse>('/items')
