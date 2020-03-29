import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import styled from 'styled-components';
import { TESC_BLUE, BORDER_RADIUS_LG } from '~/styles/constants';

const BlueNavbar = styled(Navbar)`
  background: ${TESC_BLUE};
  border-radius: ${BORDER_RADIUS_LG};
`

const AdminNav: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <BlueNavbar expand="md" className="mb-3 mx-3">
        <NavbarBrand href="/" className="mr-auto">TESC Inventory</NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse isOpen={!isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/">something</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">something else</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </BlueNavbar>
    </div>
  );
}

export default AdminNav;