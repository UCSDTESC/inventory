import { Service } from 'typedi';
import { InventoryItem } from '@Shared/Types';
import * as admin from 'firebase-admin';
import { SuccessResponse, GetItemsResponse } from '@Shared/api/Responses';

@Service()
export default class FirebaseService {

  async createItem(item: InventoryItem) {
    try {
      await admin
        .firestore()
        .collection('items')
        .doc()
        .set({...item, createdAt: this.getTimeStamp()} as InventoryItem);
    
      return SuccessResponse.Positive;
    } catch(e) {
      return SuccessResponse.Negative;
    }
  }

  async getAllItems(): Promise<GetItemsResponse|SuccessResponse> {
    try {
      const snapshot = await admin
        .firestore()
        .collection('items')
        .get()
      
      let items = snapshot
        .docs
        .map<InventoryItem>(doc => doc.data() as InventoryItem);
      
      for (let item of items) {
        item.createdBy = await this.getUserByUID(item.createdBy as string);
      }

      return {items}
    
    } catch(e) {
      return SuccessResponse.Negative;
    }
  }

  async getUserByUID(uid: string): Promise<admin.auth.UserRecord> {
    return await admin.auth().getUser(uid);
  }

  getTimeStamp() {
    return admin.firestore.Timestamp.now()
  }
}