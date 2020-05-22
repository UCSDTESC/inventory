import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { TESC_BLUE, TESC_BLUE_LIGHTER, BORDER_RADIUS_LG } from '~/styles/constants';
import { Rounded } from '~/styles';
import { breakpoints } from '~/styles/breakpoints';
import { NavLink } from 'react-router-dom';

const Container = styled(Rounded)<{isOpen: boolean}>`
  background: ${TESC_BLUE};
  color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  transition-property: width, max-width, min-width;
  transition-duration: .2s;
  transition-timing-function: linear;

  // Only on large screens
  @media (min-width: ${breakpoints['md']}) {

    // Sidebar open 
    ${props => props.isOpen && `
        min-width: 17rem;
        max-width: 17rem;
        width: 17rem;
    `}
      
    // Sidebar closed
    ${props => !props.isOpen && `
      min-width: 4.7rem;
      max-width: 4.7rem;
      width: 4.7rem;
    `}
  }
`;

const LogoContainer = styled.div.attrs(props => ({
  className: `flex-column text-white ${props.className}`
}))<{isOpen: boolean}>`
  img {
    max-height: 5rem;
    width: auto;

    @media (max-width: ${breakpoints['md']}) {
      content: url("/tesc-white.png");
    }

    // Only on large screens
    @media (min-width: ${breakpoints['md']}) {
      ${props =>`
        // Add a white T here 
        content: ${props.isOpen ? 'url("/tesc-white.png")' : ''};      
      `}
    }
  }
`

const ListElements = styled.div<{
  isOpen: boolean;
}>`

  label {
    margin: 0;
  }

  // Only on large screens
  @media (min-width: ${breakpoints['md']}) {
    // Sidebar closed
    ${props => !props.isOpen && `
      label {
        display: none;
      }
    `}
  }

  // Only on small screens
  @media (max-width: ${breakpoints['md']}) {
    ${props => !props.isOpen && css`
      display: none;
    `}
  }
`

export const NavEmoji = styled.span`
  filter: grayscale(100%);
  text-align: center;
  line-height: 23px;
`

const activeClassName = 'nav-item-active';

const navLinkStyle = `
  width: 100%;
  color: white;
  font-size: 1.2rem;
  padding: 0.7rem;
  display: flex;
  line-height: 23px;

  &.${activeClassName} {
    background: white;
    border-radius: ${BORDER_RADIUS_LG};
    color: ${TESC_BLUE};

    ${NavEmoji} {
      filter: none;
    }
  }

  &:hover {
    background: ${TESC_BLUE_LIGHTER};
    border-radius: ${BORDER_RADIUS_LG};
    color: white;
  }
` 

const Link = styled(NavLink).attrs({
  activeClassName
})`${navLinkStyle}`

const Expander = styled.div`
  ${navLinkStyle}
  text-align: center;
  padding: 0.05rem;
  cursor: pointer;
`

const Sidebar: React.FunctionComponent = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Container isOpen={isOpen}>
        <LogoContainer className="d-flex" isOpen={isOpen}>
          <img className="my-3 mx-auto"/>
        </LogoContainer>
        <ListElements isOpen={isOpen}>
          <div className="d-flex justify-content-center mb-3">
            <Link to='/admin' exact={true}>
              <NavEmoji>📊</NavEmoji> 
              <label>Dashboard</label>
            </Link>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <Link to='/admin/new' exact={true}>
              <NavEmoji>🆕</NavEmoji> 
              <label>New</label>
            </Link>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <Link to='/admin/requests' exact={true}>
              <NavEmoji>📖</NavEmoji> 
              <label>Requests</label>
            </Link>
          </div>
        </ListElements>
        <div className="d-flex justify-content-center d-md-none">
          <Expander onClick={toggle} className="align-items-center justify-content-center">
            {isOpen ? "👆" : "👇"}
          </Expander>
        </div>
        <div className="d-none justify-content-center d-md-block">
          <Expander onClick={toggle} className="align-items-center justify-content-center">
            {isOpen ? "👈" : "👉"}
          </Expander>
        </div>
      </Container>
    </>
  );
}

export default Sidebar;