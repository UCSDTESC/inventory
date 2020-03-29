import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import { TESC_BLUE } from '~/styles/constants';
import Button from '~/components/Button';

const Panel = styled.div`
  background-color: ${TESC_BLUE};
  border-radius: 10px;
  box-shadow: 4px 4px 4px #bfbfbf;
  height: 55vh;
  padding: 26px;
  width: 42vw;
`;
const InnerPanel = styled.div`
  background-color: white;
  border-radius: 10px;
  height: 50vh;
  overflow: auto;
  padding: 26px;
  width: 40vw;
`;

const HomePage: React.FunctionComponent = () => {
  return (
    <div className="container-fluid">
      <div className='d-flex flex-column align-items-center'>
        <img src='/tesc-logo.png'className='w-25 my-3 mx-auto'/>
        <p>fill out form below to borrow stuff from tesc. use ur ucsd email btw.</p>
        <Panel className='d-flex align-items-center justify-content-center'>
          <InnerPanel className='d-flex justify-content-center'/>
        </Panel>
      </div>

    </div>
  );
}

export default HomePage;
