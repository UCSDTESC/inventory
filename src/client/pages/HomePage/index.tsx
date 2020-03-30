import React from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';

import TESCForm, { TESCFormField } from '~/components/TESCForm';
import { TESC_BLUE } from '~/styles/constants';
import { Rounded } from '~/styles';
import { FormGroup, Col } from 'reactstrap';

const Panel = styled(Rounded)`
  background-color: ${TESC_BLUE};
  height: 70vh;
  width: 50vw;
`;
const InnerPanel = styled(Rounded)`
  background-color: white;
  height: 95%;
  overflow: auto;
  width: 95%;
`;

const HomePage: React.FunctionComponent = () => {
  const validationSchema = Yup.object({
        firstName: Yup.string()
          .max(30, 'Must be 30 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(30, 'Must be 30 characters or less')
          .required('required'),
        email: Yup.string()
          .matches(/^[A-Z0-9._%+-]+@ucsd+\.edu$/i, 'Invalid ucsd.edu email')
          .required('Required'),
        purpose: Yup.string()
          .max(500, 'Must be 500 characters or less')
          .required('Required'),
        item: Yup.string()
          .max(100, 'Must be 100 characters or less')
          .required('Required')
      });
  return (
    <div className="container-fluid">
      <div className='d-flex flex-column align-items-center'>
        <img src='/tesc-logo.png'className='w-25 my-3 mx-auto'/>
        <p>fill out form below to borrow stuff from tesc. use ur ucsd email btw.</p>
        <Panel className='d-flex align-items-center justify-content-center'>
          <InnerPanel className='d-flex justify-content-center'>
            <TESCForm validationSchema={validationSchema} onClickSubmit={()=>{}}>
              <FormGroup row>
                <Col md={6}>
                  <TESCFormField label={'First Name'} fieldName={'firstName'} inputType={'text'}/>   
                </Col>
                <Col md={6}>
                  <TESCFormField label={'Last Name'} fieldName={'lastName'} inputType={'text'}/>
                </Col>
              </FormGroup>
              <TESCFormField label={'Email'} fieldName={'email'} inputType={'email'}/>
              <TESCFormField label={'Item'} fieldName={'item'} inputType={'text'}/>
              <TESCFormField label={'Purpose'} fieldName={'purpose'} inputType={'text'}/>
            </TESCForm> 
          </InnerPanel>
        </Panel>
      </div>

    </div>
  );
}

export default HomePage;
