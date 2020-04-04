import * as firebase from 'firebase-admin';
type ServerTimestamp = firebase.firestore.Timestamp;

export type CreateItemRequest = {
  name: string;
  description: string;
  forRent: boolean;
  quantity: number;
  tags: Array<string>;
}

export type CheckOutRequest = {
  item: string;
  firstName: string;
  lastName: string;
  email: string;
  organizationName: string;
  approvedBy?: string;
  purpose: string;
  dateNeededBy: string;
  createdAt?: ServerTimestamp;
}