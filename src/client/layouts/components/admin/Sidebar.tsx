import React from 'react';
import styled from 'styled-components';
import { TESC_BLUE, BORDER_RADIUS_LG } from '~/styles/constants';
import AdminNav from './AdminNav';
import { Rounded } from '~/styles';
import { NavLink } from 'react-router-dom';

const Container = styled(Rounded)`
  min-width: 17rem;
  max-width: 17rem;
  background: ${TESC_BLUE};
  color: white;
`;

const activeClassName = 'nav-item-active'

const Link = styled(NavLink).attrs({
  activeClassName
})`

  color: white;
  font-size: 1.2rem;
  padding: 0.7rem;

  &.${activeClassName} {
    background: white;
    border-radius: ${BORDER_RADIUS_LG};
    color: ${TESC_BLUE}
  }
` 

const Sidebar: React.FunctionComponent = (props) => {

  return (
    <>
      {/* Hide on sidebar on screens below md */}  
      <Container className="d-none d-md-block">
        <div className="w-100 d-flex flex-column text-white">
          <img src="/tesc-white.png" className="w-75 my-3 mx-auto"/>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <Link to='/admin' exact={true}> 📊Dashboard </Link>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <Link to='/admin/new' exact={true}>🆕New </Link>
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