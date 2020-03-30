import React from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';

import TESCForm from '~/components/TESCForm';
import { TESC_BLUE } from '~/styles/constants';
import { Rounded } from '~/styles';

const Panel = styled(Rounded)`
  background-color: ${TESC_BLUE};
  height: 60vh;
  width: 50vw;
`;
const InnerPanel = styled(Rounded)`
  background-color: white;
  height: 95%;
  overflow: auto;
  width: 95%;
`;

const HomePage: React.FunctionComponent = () => {
  const formItems = [{
    label: 'First Name',
    fieldName: 'firstName',
    type: 'text'
  }];
  const validationSchema = Yup.object({
        firstName: Yup.string()
          .max(30, 'must be 30 characters or less')
          .required('required'),
        lastName: Yup.string()
          .max(30, 'must be 30 characters or less')
          .required('required'),
        email: Yup.string()
          .matches(/^[A-Z0-9._%+-]+@ucsd+\.edu$/i, 'invalid ucsd.edu email')
          .required('required'),
        purpose: Yup.string()
          .max(500, 'must be 500 characters or less')
          .required('required'),
        item: Yup.string()
          .max(100, 'must be 100 characters or less')
          .required('required')
      });
  return (
    <div className="container-fluid">
      <div className='d-flex flex-column align-items-center'>
        <img src='/tesc-logo.png'className='w-25 my-3 mx-auto'/>
        <p>fill out form below to borrow stuff from tesc. use ur ucsd email btw.</p>
        <Panel className='d-flex align-items-center justify-content-center'>
          <InnerPanel className='d-flex justify-content-center'>
            <TESCForm items={formItems} validationSchema={validationSchema} onClickSubmit={()=>{}} />
          </InnerPanel>
        </Panel>
      </div>

    </div>
  );
}

export default HomePage;
