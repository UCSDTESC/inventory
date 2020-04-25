import { Service } from 'typedi';
import { InventoryItem } from '@Shared/Types';
import * as admin from 'firebase-admin';
import { SuccessResponse, GetItemsResponse } from '@Shared/api/Responses';

@Service()
export default class ItemService {

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

  async removeItem(itemID: string) {
    try {
      await admin
        .firestore()
        .collection('items')
        .doc(itemID)
        .delete();
    
      return SuccessResponse.Positive;
    } catch(e) {
      return SuccessResponse.Negative;
    }
  }

  async getAllItems(): Promise<GetItemsResponse> {
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
  }

  async getUserByUID(uid: string): Promise<admin.auth.UserRecord> {
    return await admin.auth().getUser(uid);
  }

  async getItemTags(): Promise<Array<string>> {
    const snapshot = await admin
      .firestore()
      .collection('items')
      .get();
      
    let mergedItems = snapshot
      .docs
      .map<Array<string>>(doc => (doc.data().tags ?? []))
      .reduce((currMerge, x) => [...currMerge, ...x], []);

    return Array.from(new Set<string>(mergedItems));
  }

  getTimeStamp() {
    return admin.firestore.Timestamp.now()
  }
}