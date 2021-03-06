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
import InputWithChips, { OptionType } from '~/components/InputWithChips';
import { InventoryItem } from '~/../shared/Types';
import { OptionProps } from 'react-select/';

const Panel = styled(Rounded)`
  background-color: ${TESC_BLUE};
`;

type RequestFormData = {
  firstName: string;
  lastName: string;
  email: string;
  purpose: string;
  items: Array<InventoryItem>;
  dateNeededBy: string;
  organizationName: string;
}

const Photo = styled.img`
  max-height: 2.5rem;

  border-radius: 10px;
  margin-right: 1rem;
`

const Item = styled.div`
  margin: 1rem;

`

const ItemOption: React.FC<OptionProps<OptionType<InventoryItem>>> = (props) => {
  const { innerProps, innerRef, data } = props;

  return (
    <Item ref={innerRef} {...innerProps}>
      {data.value?.pictureUrl?.length && 
        <Photo src={data.value.pictureUrl} className="shadow-sm" />
      }
      <span>{data.value.name}</span>
    </Item>
  )
}


const HomePage: React.FunctionComponent = () => {
  const [itemsOptions, setItemOptions] = useState<Array<InventoryItem>>([]);
  useEffect(()=>{
    async function getItemsOptions(){
      // TODO: create functionality to show quantity
      const {data} = await getItems();
      setItemOptions(data.items);
    }
    getItemsOptions();
  }, []);

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
    items: Yup.array<InventoryItem>()
      .required('Required'),
    dateNeededBy: Yup.string().required('Required')
  });

  async function onSubmit(values: RequestFormData, {resetForm}: FormikHelpers<RequestFormData>) {
    console.log(values.items);
    const data = {...values, items: values.items.map(v => v.id)};
    const res = await submitCheckOutRequest(data);
    alert('Thank you for ur submission, we will contact u');
    resetForm();
  }

  return (
    <div className="container-fluid">
      <div className='d-flex flex-column align-items-center'>
        <img src='/tesc-logo.png'className='w-25 my-3 mx-auto'/>
        <p>Fill out the form below to borrow items from TESC. Use your UCSD email.</p>
        <Panel className='d-flex align-items-center justify-content-center p-3'>
            <Formik<RequestFormData>
              onSubmit={onSubmit}
              enableReinitialize={true}
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
                <TESCForm
                  labelCSS={`
                    color: white;
                  `}
                >
                  <FormGroup row>
                    <Col md={12} className="text-center my-3">
                      <h1 className="text-white">Request an Item</h1>
                    </Col>
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
                      <InputWithChips<InventoryItem>
                        value={field.value} options={itemsOptions} 
                        isCreatable={false}
                        mapValueToOption={(v) => ({value:v, label: v.name})}
                        components={{
                          Option: d => <ItemOption {...d} />
                        }}
                        onChange={(e)=>(setFieldValue('items', e))}
                      />
                    )
                    }
                  </TESCFormField>
                  <TESCFormField light label='Purpose' name='purpose' type='text' />
                  <TESCFormField light label='Date Needed By' name='dateNeededBy' type='date'/>
                  <Button 
                    disabled={!isValid}
                    light={true}
                    className='my-2 w-100' type='submit'>
                    Submit
                  </Button>
                </TESCForm>
              )}
            </Formik>
        </Panel>
      </div>

    </div>
  );
}

export default HomePage;
