import React from 'react';
import { Formik, FormikProps, FieldProps } from 'formik';
import * as Yup from 'yup';
import {FormGroup, Col} from 'reactstrap';
import { createItem } from '~/data/AdminApi';
import { TESCFormField, TESCForm } from '~/components/TESCForm2';
import Switch from '~/components/Switch';
import Button from '~/components/Button';

type NewItemFormData = {
  name: string;
  description: string;
  forRent: boolean;
  quantity: number;
}

const NewItemForm: React.FunctionComponent = () => {

  const validationSchema = Yup.object<NewItemFormData>({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    forRent: Yup.boolean(),
    quantity: Yup.number()
  });

  async function onSubmit(values: NewItemFormData) {
    const res = await createItem(values);
  }

  return (
    <Formik<NewItemFormData>
      onSubmit={onSubmit}
      initialValues={{
        name: '',
        description: '',
        forRent: false,
        quantity: 0
      }}
      validationSchema={validationSchema}
    >
      {({setFieldValue}: FormikProps<NewItemFormData>) => (
      <TESCForm labelCSS={`color: white`}>
        <>
          <FormGroup row>
            <Col md={6}>
              <TESCFormField light label='Item Name' name="name" type="text"/>   
            </Col>
            <Col md={6}>
              <TESCFormField light label='Description' name='description' type='text'/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md={6}>
              <TESCFormField light label='For Rent' name='forRent'>
              {({field}: FieldProps) => (
                <Switch value={field.value} onChange={(e) => setFieldValue('forRent', e.target.checked)}/>
            )}
              </TESCFormField>   
            </Col>
            <Col md={6}>
              <TESCFormField light label='Quantity' name='quantity' type='number'/>
            </Col>
          </FormGroup>
          <Button 
            light={true}
            className='align-self-center m-2' type='submit'>
            Submit
          </Button>
        </>
    </TESCForm>
          )}
  </Formik>
  );

}

export default NewItemForm