import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styled from 'styled-components';
import Button from '~/components/Button';

const ErrorMsg = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
`;

const HomePage: React.FunctionComponent = () => {
  return (
    <div className="container-fluid">
      <div className='d-flex flex-column align-items-center'>
        <h1>TESC Inventory</h1>
        <p>~ some text here that introduces what this is ~</p>
        <div>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '' }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(30, 'must be 30 characters or less')
                .required('required'),
              lastName: Yup.string()
                .max(30, 'must be 30 characters or less')
                .required('required'),
              email: Yup.string()
                .matches(/^[A-Z0-9._%+-]+@ucsd+\.edu$/i, 'invalid ucsd.edu email')
                .required('required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className='d-flex flex-column'>
              <div>
                <span>First Name </span>
                <Field name="firstName" type="text" />
                <ErrorMsg name="firstName" component='span'/>
              </div>
              <div>
                <span>Last Name </span>
                <Field name="lastName" type="text" />
                <ErrorMsg name="lastName" component='span'/>
              </div>
              <div>
                <span>Email Address </span>
                <Field name="email" type="email" />
                <ErrorMsg name="email" component='span'/>
              </div>
              <button className='align-self-center' type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
