import React from 'react';
import * as Yup from 'yup';
import TESCForm, { TESCFormField } from '~/components/TESCForm';
import {FormGroup, Col} from 'reactstrap';
import Switch from '~/components/Switch';
import { TESC_BLUE } from '~/styles/constants';
import { Rounded } from '~/styles';
import styled from 'styled-components';
import NewItemForm from './components/NewItemForm';

const NewItemPage: React.FunctionComponent = () => {

  const validationSchema = Yup.object({
    name: Yup.string(),
    description: Yup.string()
  });

  const Container = styled(Rounded)`
    background: ${TESC_BLUE};
  `

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