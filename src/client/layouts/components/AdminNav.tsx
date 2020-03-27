import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import styled from 'styled-components';
import { TESC_BLUE } from '~/styles/constants';

const BlueNavbar = styled(Navbar)`
  background: ${TESC_BLUE};
`

const AdminNav: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <BlueNavbar expand="md">
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