import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Input, FormFeedback } from 'reactstrap';

import Button from '~/components/Button';

const FormField = styled(Field)`
  border-radius: 10px;
  margin: 4px;
`;

type Props = {
  initialValues?: {},
  validationSchema?: Yup.ObjectSchema,
  onClickSubmit: ()=>void,
}

export type FieldProps = {
  label: string,
  fieldName: string,
  inputType: string,
}

const input = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <>
      <Input
        invalid={!!(touched[field.name] && errors[field.name])}
        {...field}
        {...props}
        value={field.value || ""}
      />
      {touched[field.name] && errors[field.name] && (
        <FormFeedback>{errors[field.name]}</FormFeedback>
      )}
    </>
  );
};

const TESCForm: React.FunctionComponent<Props> = (props) => {
  return (
    <Formik
      initialValues={props.initialValues?? {}}
      validationSchema={props.validationSchema?? null}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className='d-flex flex-column'>
        {props.children}
        <Button 
          className='align-self-center m-2' type='submit'
          onClick={props.onClickSubmit}>
          Submit
        </Button>
      </Form>
    </Formik>
  );
}

const TESCFormField: React.FunctionComponent<FieldProps> = (props) => {
  return(
    <>
      <span>{props.label}</span>
      <FormField name={props.fieldName} type={props.type} component={input} />
    </>
  );
}

export default TESCForm;
export { TESCFormField };