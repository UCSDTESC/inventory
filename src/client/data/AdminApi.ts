import axios from 'axios'
import { ADMIN_API_PREFIX, } from '@Shared/api/Paths';
import { GetItemsResponse } from '@Shared/api/Responses';
import { CreateItemRequest } from '@Shared/api/Requests';
import * as firebase from 'firebase';

export const client = axios.create({baseURL: ADMIN_API_PREFIX});

export const getItems = () => 
  client
    .get<GetItemsResponse>('/items')

export const createItem = (body: CreateItemRequest) =>
  client
    .post<CreateItemRequest>('/items', body)