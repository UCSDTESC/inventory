import axios from 'axios';
import { USER_API_PREFIX } from '@Shared/api/Paths';
import { CheckOutRequest } from '@Shared/api/Requests';

export const client = axios.create({baseURL: USER_API_PREFIX});

export const submitCheckOutRequest = (body: CheckOutRequest) =>
  client
    .post<CheckOutRequest>('/checkOut', body)