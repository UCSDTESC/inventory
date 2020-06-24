import { Service } from 'typedi';
import * as admin from 'firebase-admin';
import { Config } from '@Config/index';
import * as uuid from 'uuid';

@Service()
export default class CloudStorageService { 
  
  async uploadImage(file: Express.Multer.File, isPublic: boolean = false): Promise<[string, any]> {
    var bucket = admin.storage().bucket(Config.Firebase.cloudStorageDefaultBucket);

    const [uploadedFile, metadata] = await bucket.upload(file.path, {
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: uuid.v4(),
          contentType: 'image/jpeg'
        }
      }
    });

    // At the time of writing the Firebase config to make this bucket public read do not get 
    // propogated to GCS properly - so we do it programatically to make sure.
    if (isPublic) {
      await uploadedFile.makePublic();
    }

    // hack? /shrug
    const uploadedFileUrl = `https://storage.googleapis.com/${uploadedFile.metadata.bucket}/${uploadedFile.metadata.name}`;

    return [uploadedFileUrl, metadata];
  }

  async deleteImages(itemID:string){
    var item = await admin.firestore().collection('items').doc(itemID).get();

    var pictureUrl = item.get('pictureUrl');
    if(pictureUrl != undefined && pictureUrl != ''){
      this.deleteImage(pictureUrl);
    }

    var receiptUrl = item.get('receiptUrl');
    if(receiptUrl != undefined && receiptUrl != ''){
      this.deleteImage(receiptUrl);
    }
  }

  deleteImage(fileURL: string){
    var fileParts = fileURL.split('/');
    var fileName = fileParts[fileParts.length - 1];
    var bucket = admin.storage().bucket(Config.Firebase.cloudStorageDefaultBucket);
    var pictureRef = bucket.file(fileName);

    pictureRef.delete().then(function() {
      // File deleted successfully
    }).catch(function(error) {
      console.log("ERROR on deleting image: " + fileURL)
    });
  }
}