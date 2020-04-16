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
import Camera from '~/components/Camera';

export type NewItemFormData = {
  name: string;
  description: string;
  forRent: boolean;
  quantity: number;
  tags: Array<string>;
  serials: Array<string>;
  picture: Blob;
  url: string; 
  price: number; 
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
    quantity: Yup.number().required('Required'),
    tags: Yup.array<string>(),
    serials: Yup.array<string>(),
    picture: Yup.mixed(),
    url: Yup.string(),
    price: Yup.number()
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
        quantity: 1,
        tags: [],
        serials: [],
        picture: new Blob(),
        url: '',
        price: 0
      }}
      isInitialValid={false}
      validationSchema={validationSchema}
    >
      {({setFieldValue, isValid}: FormikProps<NewItemFormData>) => (
      <TESCForm labelCSS={`color: white`} className="container">
        <>
          <FormGroup row>
            <Col md={6}>
              <TESCFormField light label='* Item Name' name="name" type="text"/>   
            </Col>
            <Col md={6}>
              <TESCFormField light label='* Description' name='description' type='text'/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md={6}>
              <TESCFormField light label='* For Rent' name='forRent'>
              {({field}: FieldProps) => (
                <Switch value={field.value} onChange={(e) => setFieldValue('forRent', e.target.checked)}/>
              )}
              </TESCFormField>   
            </Col>
            <Col md={6}>
              <TESCFormField light label='* Quantity' name='quantity' type='number'/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md={6}>
              <TESCFormField label='Tags' name='tags'>
                {({field}: FieldProps<string[]>) => (
                  <InputWithChips<string> 
                    value={field.value} options={props.tags} 
                    isCreatable={true}
                    mapValueToOption={(v) => ({value: v, label: v})}
                    onChange={(e) => setFieldValue('tags', e)}
                  />
                )}
              </TESCFormField>
            </Col>
            <Col md={6}>
              <TESCFormField label='Serial Numbers' name='serials'>
                {({field}: FieldProps<string[]>) => (
                  <InputWithChips<string>
                    isCreatable={true}
                    value={field.value} options={[]}
                    mapValueToOption={(v) => ({value: v, label: v})}
                    onChange={(e) => setFieldValue('serials', e)}
                  />
                )}
              </TESCFormField>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md={6}>
              <TESCFormField light label='URL' name="url" type="text"/>   
            </Col>
            <Col md={6}>
              <TESCFormField light label='Price' name='price' type='text'/>
            </Col>
          </FormGroup>


          <FormGroup row>
            <Col md={6}>
              <TESCFormField label='Picture' name='picture'>
                {({field}: FieldProps<Blob>) => (
                  <Camera value={field.value} onChange={(e) => setFieldValue('picture', e)}
                  light={true} />
                )}
              </TESCFormField>
            </Col>
            <Col md={6}>
              <TESCFormField label='Receipt' name='receipt'>
                {({field}: FieldProps<Blob>) => (
                  <Camera onChange={(e) => setFieldValue('receipt', e)}
                  light={true} />
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