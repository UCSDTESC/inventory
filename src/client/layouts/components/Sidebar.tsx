import React from 'react';
import styled from 'styled-components';
import { TESC_BLUE } from '~/styles/constants';
import AdminNav from './AdminNav';
import { Button } from 'reactstrap';
import { useFirebase } from '~/firebase';
import {client as AdminApiClient} from '~/data/AdminApi';

const Container = styled.div`
  width: 17rem;
  background: ${TESC_BLUE};
  color: white;
`;

const Sidebar: React.FunctionComponent = (props) => {

  const firebase = useFirebase();

  async function onLogout() {
    await firebase.logout();
    AdminApiClient.defaults.headers['Authorization'] = ``;
  }

  return (
    <>
      {/* Hide on sidebar on screens below md */}  
      <Container className="d-none d-md-block">
        <div className="w-100 d-flex flex-column text-white">
          <img src="/tesc-white.png" className="w-75 my-3 mx-auto"/>
        </div>
        <div>
          <Button color="danger" onClick={onLogout}>Logout</Button>
        </div>
      </Container>

      {/* Show nav on screens above md */}
      <div className="d-block d-md-none">
        <AdminNav />
      </div>
    </>
  );
}

export default Sidebar;