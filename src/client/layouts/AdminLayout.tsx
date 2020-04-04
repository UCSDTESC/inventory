import React, { useState } from 'react';
import Sidebar from './components/admin/Sidebar';
import TopBar from './components/admin/TopBar';
import useAdmin from '~/data/admin';

const AdminLayout: React.FunctionComponent = (props) => {

  const admin = useAdmin();

  if(!admin) {
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