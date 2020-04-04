import { Service } from "typedi";
import * as admin from 'firebase-admin';
import { CheckOutRequest } from '@Shared/api/Requests';
import { SuccessResponse } from '@Shared/api/Responses';

@Service()
export default class RequestService{
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
}