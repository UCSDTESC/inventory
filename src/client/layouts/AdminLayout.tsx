import React, { useState } from 'react';
import Sidebar from './components/admin/Sidebar';
import TopBar from './components/admin/TopBar';
import useUser from '~/data/user';

const AdminLayout: React.FunctionComponent = (props) => {

  const user = useUser();


  if(!user) {
    <div>Error: User not found</div>
  }

  return (
    <div className="w-100 h-100 d-flex flex-column flex-md-row p-3">
      <Sidebar />
      <div className="flex-grow-1 ml-md-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <TopBar />
            </div>
          </div>
        </div>
       {props.children}
      </div>
    </div>
  );
}

export default AdminLayout;