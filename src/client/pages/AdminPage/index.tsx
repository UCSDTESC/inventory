import React, { useEffect, useState } from 'react';
import { getItems } from '~/data/AdminApi';
import LinkButton from '~/components/LinkButton';
import styled from 'styled-components';
import { BORDER_RADIUS_LG } from '~/styles/constants';
import ItemTable from './components/ItemTable';
import { InventoryItem } from '~/../shared/Types';
import Loading from '~/components/Loading';
import SearchBar from './components/SearchBar';

const Action = styled(LinkButton)`
  border-radius: ${BORDER_RADIUS_LG} !important;
`

const barStyle = {
  display: "flex",
  flexDirection: "row"
}
const searchStyle = {
  width: "75%",
  alignSelf: "flex-start"
}


const AdminPage: React.FunctionComponent = () => {

  const [items, setItems] = useState<Array<InventoryItem>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    const fetchItems = async () => {
      const {data} = await getItems();
      setItems(data.items);
      setLoading(false);
    }
    console.log("useEffect runs");
    fetchItems();
  }, [])

  useEffect(() => {
    if(loading === true){
      const fetchItems = async () => {
        const {data} = await getItems();
        let itemList = data.items
        if(search !== ""){
          itemList = itemList.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
          });
        }

        setItems(itemList);
        setLoading(false);
      }

      fetchItems();
    }
  }, [loading])

  useEffect(() => {
    setLoading(true)
  }, [search])
  
  function remountCallback(){
    setLoading(true);
  }

  if (loading) return (
    <div className="text-center w-100">
      <h3 className="my-2"> Loading Items... </h3>
      <Loading />
    </div>
  )

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12" style = {barStyle}>
          <Action className="text-white shadow-sm" to="/admin/new" style = {{alignSelf: "flex-start"}}>
              <h4 className="my-auto p-1">+ Create Item</h4>
          </Action>
          <div style = {searchStyle}>
            <SearchBar setSearchFunction={setSearch}/>
            {search !== "" && 
              <div style = {{paddingLeft:"2%", marginLeft:"3px"}}>
                  Number of results for "{search}": {items.length}
              </div>
            }
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <ItemTable data={items} remountCallback={remountCallback} />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;