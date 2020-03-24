import React from 'react';
import Button from '~/components/Button';

const AdminPage: React.FunctionComponent = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <Button>
            This is a button
          </Button>
        </div>
      </div>

    </div>
  );
}

export default AdminPage;