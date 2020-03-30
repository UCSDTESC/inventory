import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps as FormikFieldProps } from 'formik';
import * as Yup from 'yup';
import styled, { css } from 'styled-components';
import { Input, FormFeedback, Label } from 'reactstrap'; 
import Button from '~/components/Button';

const FormField = styled(Field)`
  border-radius: 10px;
  margin: 4px;
`;

type Props = {
  initialValues?: {},
  validationSchema?: Yup.ObjectSchema,
  onClickSubmit: ()=>void,
  labelCSS?: string;
  isButtonLight?: boolean;
}

const StyledForm = styled(Form)<{labelCSS?: string}>`
  & label {
    ${({labelCSS}) => labelCSS ? css`${labelCSS}` : ''}
  }
`

export type FieldProps = {
  label: string,
  fieldName: string,
  inputType: string,
}

const input = ({ field, form: { touched, errors }, ...props }: FormikFieldProps) => {
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
      <StyledForm className='d-flex flex-column' labelCSS={props.labelCSS}>
        {props.children}
        <Button 
          light={props.isButtonLight}
          className='align-self-center m-2' type='submit'
          onClick={props.onClickSubmit}>
          Submit
        </Button>
      </StyledForm>
    </Formik>
  );
}

const TESCFormField: React.FunctionComponent<FieldProps> = (props) => {
  return(
    <>
      <Label>{props.label}</Label>
      <FormField name={props.fieldName} type={props.inputType} component={input} />
    </>
  );
}

export default TESCForm;
export { TESCFormField };