import React from 'react';
import { TESC_BLUE } from '~/styles/constants';
import { Rounded } from '~/styles';
import styled from 'styled-components';
import NewItemForm from './components/NewItemForm';

const Container = styled(Rounded)`
  background: ${TESC_BLUE};
`

const NewItemPage: React.FunctionComponent = () => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <Container>
            <div className="text-white text-center">
              <h1>Create An Item</h1>
            </div>
            <NewItemForm />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default NewItemPage;