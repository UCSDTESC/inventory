import { Service } from "typedi";
import * as admin from 'firebase-admin';
import { CheckOutRequest } from '@Shared/api/Requests';
import { SuccessResponse, GetItemsResponse } from '@Shared/api/Responses';
import { InventoryItem } from '@Shared/Types';

@Service()
export default class RequestService {
    async createCheckOutRequest(item: CheckOutRequest){
        try{
            await admin.firestore()
                .collection('checkOutRequests')
                .doc()
                .set({...item, createdAt: admin.firestore.Timestamp.now()} as CheckOutRequest);
            return SuccessResponse.Positive;
        } catch(e){
            return SuccessResponse.Negative;
        }
    }

    async getAllItemsForRent(): Promise<GetItemsResponse>{
        const snapshot = await admin
            .firestore()
            .collection('items')
            .get(); // TODO: create query so this only retrieves 'forRent == true' items
        
        let items = snapshot
            .docs
            .map<InventoryItem>(doc =>doc.data() as InventoryItem);
        
        for (let item of items){
            // TODO: figure out a cleaner way to do this... whether it be returning a new Response Type or finding a more efficient 
            // way to 'nullify' values we don't want to send to the client.
            item.createdBy = '';
            item.price = '';
            item.url = '';
            item.serials = null;
            item.receiptUrl = '';
            item.updatedAt = null;
            item.createdAt = null;
            // should only return properties: name, forRent, quantity, and tags to client end, which is public facing
        }

        return {items};
    }
}