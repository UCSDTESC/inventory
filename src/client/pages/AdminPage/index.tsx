import React, { useEffect } from 'react';
import Button from '~/components/Button';
import { getItems } from '~/data/AdminApi';

const AdminPage: React.FunctionComponent = () => {

  useEffect(() => {
    const fetchItems = async () => {
      const res = await getItems();
      console.log(res);
    }
    fetchItems();
  })

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <Button>
            Button
          </Button>
        </div>
      </div>

    </div>
  );
}

export default AdminPage;