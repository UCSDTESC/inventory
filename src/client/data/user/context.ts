import React from 'react';
import * as firebase from 'firebase';

const UserContext = React.createContext<firebase.User>(null);

export default UserContext;