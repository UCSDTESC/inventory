import React from 'react';
import * as firebase from 'firebase';

const AdminContext = React.createContext<firebase.User>(null);

export default AdminContext;