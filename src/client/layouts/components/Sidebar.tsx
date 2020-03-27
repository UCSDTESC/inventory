import React from 'react';
import styled from 'styled-components';
import { TESC_BLUE } from '~/styles/constants';
import AdminNav from './AdminNav';

const Container = styled.div`
  width: 17rem;
  background: ${TESC_BLUE};
  color: white;
`;

const Sidebar: React.FunctionComponent = (props) => {

  return (
    <>
      {/* Hide on sidebar on screens below md */}  
      <Container className="d-none d-md-block">
        <div className="w-100 d-flex flex-row bg-white tesc-blue">
          <img src="/tesc-logo.png" className="w-75 my-3 mx-auto"/>
          <div>we need a designer</div>
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