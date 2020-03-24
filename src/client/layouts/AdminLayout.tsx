import React from 'react';
import Sidebar from './components/Sidebar';

const AdminLayout: React.FunctionComponent = (props) => {
  return (
    <div className="w-100 h-100 d-flex flex-row">
      <Sidebar />
      <div className="flex-grow-1">
       {props.children}
      </div>
    </div>
  );
}

export default AdminLayout;