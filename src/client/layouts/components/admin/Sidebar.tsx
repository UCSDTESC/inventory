import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { TESC_BLUE, TESC_BLUE_LIGHTER, BORDER_RADIUS_LG } from '~/styles/constants';
import { Rounded } from '~/styles';
import { breakpoints } from '~/styles/breakpoints';
import { NavLink } from 'react-router-dom';

const Container = styled(Rounded)`
  background: ${TESC_BLUE};
  color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  @media (min-width: ${breakpoints['md']}) {
    min-width: 17rem;
    max-width: 17rem;
  }
`;

const LogoContainer = styled.div.attrs(props => ({
  className: `flex-column text-white ${props.className}`
}))`
  img {
    max-height: 5rem;
    width: auto;
  }
`

const ListElements = styled.div<{
  isOpen: boolean;
}>`
  ${props => !props.isOpen && css`
    display: none;
  `}
`

const NavEmoji = styled.span`
filter: grayscale(100%);
`

const activeClassName = 'nav-item-active'
const navLinkStyle = `
  width: 100%;
  color: white;
  font-size: 1.2rem;
  padding: 0.7rem;

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
      <Container>
        <LogoContainer className="d-flex">
          <img src="/tesc-white.png" className="my-3 mx-auto"/>
        </LogoContainer>
        <ListElements isOpen={isOpen}>
          <div className="d-flex justify-content-center mb-3">
            <Link to='/admin' exact={true}><NavEmoji>📊</NavEmoji> Dashboard</Link>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <Link to='/admin/new' exact={true}><NavEmoji>🆕</NavEmoji> New</Link>
          </div>
        </ListElements>
        <div className="d-flex justify-content-center d-md-none">
          <Expander onClick={toggle}>{isOpen ? "👆" : "👇"}</Expander>
        </div>
      </Container>
    </>
  );
}

export default Sidebar;