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
        tesc inventory
      </Container>

      {/* Show nav on screens above md */}
      <div className="d-block d-md-none">
        <AdminNav />
      </div>
    </>
  );
}

export default Sidebar;