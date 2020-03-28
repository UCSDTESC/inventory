import React, {useContext} from 'react';
import Firebase from "./firebase";
import FirebaseContext from "./context";

function useFirebase(): Firebase {
  return useContext(FirebaseContext);
}

export default Firebase;
export {FirebaseContext, useFirebase};