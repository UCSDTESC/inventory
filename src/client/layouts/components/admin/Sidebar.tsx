import React from 'react';
import styled from 'styled-components';
import { TESC_BLUE } from '~/styles/constants';
import AdminNav from './AdminNav';
import { Rounded } from '~/styles';

const Container = styled(Rounded)`
  width: 17rem;
  background: ${TESC_BLUE};
  color: white;
`;

const Sidebar: React.FunctionComponent = (props) => {

  return (
    <>
      {/* Hide on sidebar on screens below md */}  
      <Container className="d-none d-md-block">
        <div className="w-100 d-flex flex-column text-white">
          <img src="/tesc-white.png" className="w-75 my-3 mx-auto"/>
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