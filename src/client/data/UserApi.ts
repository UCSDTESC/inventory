import axios from 'axios';
import { USER_API_PREFIX } from '@Shared/api/Paths';
import { CheckOutRequest } from '@Shared/api/Requests';
import { GetItemsResponse } from '~/../shared/api/Responses';

export const client = axios.create({baseURL: USER_API_PREFIX});

export const submitCheckOutRequest = (body: CheckOutRequest) =>
  client
    .post<CheckOutRequest>('/checkOut', body)

export const getItems = () =>
  client
    .get<GetItemsResponse>('/checkOut/items')