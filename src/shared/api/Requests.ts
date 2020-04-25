import * as firebase from 'firebase-admin';
import { InventoryItem } from '../Types';
type ServerTimestamp = firebase.firestore.Timestamp;

export type CreateItemRequest = {
  name: string;
  description: string;
  forRent: boolean;
  quantity: number;
  tags: Array<string>;
}

export type DeleteItemRequest = {
  itemID: string;
}

export type CheckOutRequest = {
  items: Array<string>;
  firstName: string;
  lastName: string;
  email: string;
  organizationName: string;
  approvedBy?: string;
  purpose: string;
  dateNeededBy: string;
  createdAt?: ServerTimestamp;
}