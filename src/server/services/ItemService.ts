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

  async getLogInfo(checkOutItems: string) {
    const snapshot = await admin 
      .firestore()
      .doc('/checkOutItems/' + checkOutItems)
      .get()
    
    const temp = snapshot.data();
    
    console.log(JSON.stringify(temp));

    return temp as any;
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
      
      // This is an unfortunate consequence of having to make a network
      // request for every item with Firebase :(
      // Caching Requests should provide a perf improvement
      // Maybe we should use Redis or something but it feels like too much atm.
      const userCache: {[x: string]: admin.auth.UserRecord} = {};
      const items: Array<InventoryItem> = [];

      for (let currentItem of snapshot.docs) {
        const item = currentItem.data();
        if (!userCache[item.createdBy as string]) {
          const uid = item.createdBy;
          item.createdBy = await this.getUserByUID(item.createdBy as string);
          userCache[uid as string] = item.createdBy
        } else {
          item.createdBy = userCache[item.createdBy as string];
        }

        // TODO: Fix any usage
        items.push({
          id: currentItem.id,
          ...item
        } as any);
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