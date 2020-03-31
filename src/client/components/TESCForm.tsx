import React from 'react';
import styled, { css} from 'styled-components';
import { Field, FieldAttributes, FieldProps, Form } from 'formik';
import { BORDER_RADIUS } from '~/styles/constants';
import { Label, Input, FormFeedback } from 'reactstrap';


type TESCFieldProps<T> = {
  light?: boolean;
  label?: string;
} & FieldAttributes<T>;

const FormField = styled(Input)`
  border-radius: ${BORDER_RADIUS};
  margin: 4px;
`;

const input = ({ field, form: { touched, errors }, ...props }: FieldProps) => {
  return (
    <>
      <FormField
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

export class TESCFormField<T> extends React.Component<TESCFieldProps<T>> {

  constructor(props: TESCFieldProps<T>) {
    super(props);
  }

  render() {
    const {props} = this;
    return (
      <>
        <Label>{props.label}</Label>
        <Field component={input} {...props} />
      </>
    );
  }
}

type TESCFormProps = {
  labelCSS?: string
}

export const TESCForm = styled(Form)<TESCFormProps>`
  & label {
    ${({labelCSS}) => labelCSS ? css`${labelCSS}` : ''}
  }
`
