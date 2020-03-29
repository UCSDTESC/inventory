import React from 'react';
import styled from 'styled-components';
import Button from '~/components/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const ErrorMsg = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
`;

const HomePage: React.FunctionComponent = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h1>TESC Inventory</h1>
          <Formik
            initialValues={{ name:'', email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = ' required ';
              } else if (
                !/^[A-Z0-9._%+-]+@ucsd+\.edu$/i.test(values.email)
              ) {
                errors.email = 'Invalid ucsd.edu email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <span>Name </span>
                  <Field type="name" name="name" />
                  <ErrorMessage name="name" component="div" />
                </div>
                <div>
                  <span>Email (your ucsd email) </span>
                  <Field type="email" name="email" />
                  <ErrorMsg name="email" component="span" />
                </div>

                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
      </Formik>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
