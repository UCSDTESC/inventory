import { Service } from "typedi";
import * as admin from 'firebase-admin';
import {CheckOutItem, CheckOutRequest} from '@Shared/api/Requests';
import { SuccessResponse, GetItemsResponse } from '@Shared/api/Responses';
import { InventoryItem } from '@Shared/Types';
import { Logger } from '@Config/Logger';

@Service()
export default class RequestService {
    async createCheckOutRequest(item: CheckOutRequest){
        try{
            await admin.firestore()
                .collection('checkOutRequests')
                .doc()
                .set({
                    ...item, 
                    items: item.items.map(i => admin.firestore().collection('items').doc(i)),
                    createdAt: admin.firestore.Timestamp.now()
                });
            return SuccessResponse.Positive;
        } catch(e){
            Logger.error('Something went wrong in creating a request')
            return SuccessResponse.Negative;
        }
    }

    async createCheckOutItem(item: CheckOutItem){
        try{
            await admin.firestore()
                .collection('checkOutItems')
                .doc()
                .set({
                    ...item,
                    createdAt: admin.firestore.Timestamp.now()
                });
            return SuccessResponse.Positive;
        } catch(e){
            Logger.error('Something went wrong in creating a request')
            return SuccessResponse.Negative;
        }
    }

    async getAllItemsForRent(): Promise<GetItemsResponse>{
        const snapshot = await admin
            .firestore()
            .collection('items')
            .where('forRent', '==', true)
            .get();
        
        let items = snapshot
            .docs
            .map<InventoryItem>(doc => ({...doc.data(), id: doc.id}) as InventoryItem);
        
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