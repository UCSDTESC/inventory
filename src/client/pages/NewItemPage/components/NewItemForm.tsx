import React from 'react';
import { Formik, FormikProps, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {FormGroup, Col} from 'reactstrap';
import { createItem } from '~/data/AdminApi';
import { TESCFormField, TESCForm } from '~/components/TESCForm';
import Switch from '~/components/Switch';
import Button from '~/components/Button';
import InputWithChips from '~/components/InputWithChips';
import { useHistory } from 'react-router-dom';

type NewItemFormData = {
  name: string;
  description: string;
  forRent: boolean;
  quantity: number;
  tags: Array<string>;
  serials: Array<string>;
}

type Props = {
  tags: Array<string>
}

const NewItemForm: React.FunctionComponent<Props> = (props) => {

  const history = useHistory();

  const validationSchema = Yup.object<NewItemFormData>({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    forRent: Yup.boolean(),
    quantity: Yup.number(),
    tags: Yup.array<string>(),
    serials: Yup.array<string>()
  });

  async function onSubmit(values: NewItemFormData, {resetForm}: FormikHelpers<NewItemFormData>) {
    const res = await createItem(values);
    resetForm();

    if (res.statusText === 'OK') {
      return history.push('/admin/');
    }
  } 

  return (
    <Formik<NewItemFormData>
      onSubmit={onSubmit}
      initialValues={{
        name: '',
        description: '',
        forRent: false,
        quantity: 0,
        tags: [],
        serials: []
      }}
      isInitialValid={false}
      validationSchema={validationSchema}
    >
      {({setFieldValue, isValid}: FormikProps<NewItemFormData>) => (
      <TESCForm labelCSS={`color: white`} className="container">
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
          <FormGroup row>
            <Col md={6}>
              <TESCFormField label='Tags' name='tags'>
                {({field}: FieldProps) => (
                  <InputWithChips<string> 
                    value={field.value} options={props.tags} 
                    mapValueToOption={(v) => ({value: v, label: v})}
                    onChange={(e) => setFieldValue('tags', e)}
                  />
                )}
              </TESCFormField>
            </Col>
            <Col md={6}>
              <TESCFormField label='Serial Numbers' name='serials'>
                {({field}: FieldProps) => (
                  <InputWithChips<string>
                    value={field.value} options={[]}
                    mapValueToOption={(v) => ({value: v, label: v})}
                    onChange={(e) => setFieldValue('serials', e)}
                  />
                )}
              </TESCFormField>
            </Col>
          </FormGroup>
          <Button 
            light={true}
            className='align-self-center m-2' type='submit'
            disabled={!isValid}
          >
            Submit
          </Button>
        </>
    </TESCForm>
          )}
  </Formik>
  );

}

export default NewItemForm