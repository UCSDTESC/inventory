import React from 'react';
import styled from 'styled-components';
import { TESC_BLUE } from '~/constants';

const Container = styled.div`
  width: 17rem;
  background: ${TESC_BLUE};
  color: white;
`;

const Sidebar: React.FunctionComponent = (props) => {

  return (
    <Container>
      tesc inventory
    </Container>
  );
}

export default Sidebar;