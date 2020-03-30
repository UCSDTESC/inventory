import React from 'react';
import * as Yup from 'yup';
import TESCForm, { TESCFormField } from '~/components/TESCForm';
import {FormGroup, Col} from 'reactstrap';
import Switch from '~/components/Switch';

const NewItemPage: React.FunctionComponent = () => {

  const validationSchema = Yup.object({
    name: Yup.string(),
    description: Yup.string()
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <TESCForm validationSchema={validationSchema} onClickSubmit={() => {}}>
            <FormGroup row>
              <Col md={6}>
                <TESCFormField label={'Item Name'} fieldName={'name'} inputType={'text'}/>   
              </Col>
              <Col md={6}>
                <TESCFormField label={'Description'} fieldName={'description'} inputType={'text'}/>
              </Col>
            </FormGroup>
          </TESCForm>
        </div>
      </div>
    </div>
  );
}

export default NewItemPage;