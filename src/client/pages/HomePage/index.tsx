import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';

import { TESCForm, TESCFormField } from '~/components/TESCForm';

import { TESC_BLUE } from '~/styles/constants';
import { Rounded } from '~/styles';
import { FormGroup, Col } from 'reactstrap';
import { Formik, FormikProps, FormikHelpers, FieldProps } from 'formik';
import { submitCheckOutRequest, getItems } from '~/data/UserApi';
import Button from '~/components/Button';
import InputWithChips from '~/components/InputWithChips';
import { InventoryItem } from '~/../shared/Types';

const Panel = styled(Rounded)`
  background-color: ${TESC_BLUE};
  height: 70vh;
  width: 50vw;
`;
const InnerPanel = styled(Rounded)`
  background-color: white;
  height: 95%;
  overflow: auto;
  width: 95%;
`;

type RequestFormData = {
  firstName: string;
  lastName: string;
  email: string;
  purpose: string;
  items: Array<string>;
  dateNeededBy: string;
  organizationName: string;
}

type ItemsForRent ={
  name: string;
  quantity: number;
}

const HomePage: React.FunctionComponent = () => {
  const [itemsOptions, setItemOptions] = useState<Array<string>>([]);
  useEffect(()=>{
    async function getItemsOptions(){
      // TODO: create functionality to show quantity
      const {data} = await getItems();
      setItemOptions(data.items.map(item => {
        return item.name
      }));
    }
    getItemsOptions();
  }
  
  )
  const validationSchema = Yup.object<RequestFormData>({
    firstName: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('required'),
    email: Yup.string()
      .matches(/^[A-Z0-9._%+-]+@ucsd+\.edu$/i, 'Invalid ucsd.edu email')
      .required('Required'),
    organizationName: Yup.string()
      .required('Required'),
    purpose: Yup.string()
      .max(500, 'Must be 500 characters or less')
      .required('Required'),
    items: Yup.array<string>()
      .required('Required'),
    dateNeededBy: Yup.string().required('Required')
  });

  async function onSubmit(values: RequestFormData, {resetForm}: FormikHelpers<RequestFormData>) {
    console.log(values);
    const res = await submitCheckOutRequest(values);
    alert('Thank you for ur submission, we will contact u');
    resetForm();
  }

  return (
    <div className="container-fluid">
      <div className='d-flex flex-column align-items-center'>
        <img src='/tesc-logo.png'className='w-25 my-3 mx-auto'/>
        <p>fill out form below to borrow stuff from tesc. use ur ucsd email btw.</p>
        <Panel className='d-flex align-items-center justify-content-center'>
          <InnerPanel className='d-flex justify-content-center'>
            <Formik<RequestFormData>
              onSubmit={onSubmit}
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                organizationName: '',
                purpose: '',
                items: [],
                dateNeededBy: ''
              }}
              validateOnMount={true}
              validationSchema={validationSchema}>
              {({isValid, setFieldValue}: FormikProps<RequestFormData>) => (
                <TESCForm>
                  <FormGroup row>
                    <Col md={6}>
                      <TESCFormField light label='First Name' name='firstName' type='text' />   
                    </Col>
                    <Col md={6}>
                      <TESCFormField light label='Last Name' name='lastName' type='text' />
                    </Col>
                  </FormGroup>
                  <TESCFormField light label='Email' name='email' type='email' />
                  {/* // ideally this should also be made a drop down */}
                  <TESCFormField light label='Name of Organization' name='organizationName' type='text'/>
                  <TESCFormField light label='Items' name='items' type='text'>
                    {({field}:FieldProps) =>(
                      <InputWithChips<string>
                        value={field.value} options={itemsOptions} mapValueToOption={(v) => ({value:v, label: v})}
                        onChange={(e)=>(setFieldValue('items', e))}
                      />
                    )
                    }
                  </TESCFormField>
                  <TESCFormField light label='Purpose' name='purpose' type='text' />
                  <TESCFormField light label='Date Needed By' name='dateNeededBy' type='date'/>
                  <Button 
                    disabled={!isValid}
                    className='align-self-center m-2' type='submit'>
                    Submit
                  </Button>
                </TESCForm>
              )}
            </Formik>
          </InnerPanel>
        </Panel>
      </div>

    </div>
  );
}

export default HomePage;
