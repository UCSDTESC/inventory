import React, { useEffect, useState } from 'react';
import { getItems } from '~/data/AdminApi';
import LinkButton from '~/components/LinkButton';
import styled from 'styled-components';
import { BORDER_RADIUS_LG } from '~/styles/constants';
import ItemTable from './components/ItemTable';
import { InventoryItem } from '~/../shared/Types';

const Action = styled(LinkButton)`
  border-radius: ${BORDER_RADIUS_LG} !important;
`

const AdminPage: React.FunctionComponent = () => {

  const [items, setItems] = useState<Array<InventoryItem>>([])

  useEffect(() => {
    const fetchItems = async () => {
      const {data} = await getItems();
      setItems(data.items);
    }
    fetchItems();
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Action className="text-white shadow-sm" to="/admin/new">
              <h4 className="my-auto p-1">+ Create Item</h4>
          </Action>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <ItemTable data={items} />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;