import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import Button from '~/components/Button';

const ErrorMsg = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
`;
const FormField = styled(Field)`
  border-radius: 10px;
  margin: 4px;
`;

type Props = {
  items: Array<FieldProps>,
  initialValues?: {},
  validationSchema?: Yup.ObjectSchema,
  onClickSubmit: ()=>void,
}

export type FieldProps = {
  label: string,
  fieldName: string,
  type: string,
}

const TESCForm: React.FunctionComponent<Props> = (props) => {
  return (
    <Formik
      initialValues={props.initialValues?? undefined}
      validationSchema={props.validationSchema?? undefined}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className='d-flex flex-column'>
        {props.items.map(item=> {
          return <TESCFormField key={item.fieldName} label={item.label} fieldName={item.fieldName} type={item.type} />;
        })}
        <Button
          className='align-self-center' type='submit'
          onClick={props.onClickSubmit}>
          Submit
        </Button>
      </Form>
    </Formik>
  );
}


const TESCFormField: React.FunctionComponent<FieldProps> = (props) => {
  return(
    <div>
      <span>{props.label}</span>
      <FormField name={props.fieldName} type={props.type} />
      <ErrorMsg name={props.fieldName} component='span'/>
    </div>
  );
}

export default TESCForm;
export {TESCFormField};