import * as firebase from 'firebase-admin';

type ServerTimestamp = firebase.firestore.Timestamp;

export type UserRecord = firebase.auth.UserRecord;

export type InventoryItem = {
  id?: string;
  name: string;
  forRent: boolean;
  quantity: number;
  createdBy: string | UserRecord;

  updatedAt?: ServerTimestamp;
  createdAt?: ServerTimestamp;
  
  description?: string;
  url?: string;
  serials?: Array<string>;
  price?: string;
  receiptUrl?: string;
  pictureUrl?: string;
  tags?: Array<string>
}