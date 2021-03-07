import React, { useState } from 'react';
import AppLayout from '@layout/app';
import RegisterForm from '@components/RegisterForm';
import { Breadcrumb, Form, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Axios  from 'axios';

export default function Register(props:any) {
  const history = useHistory();
  const {state}:any =  useLocation();
  const contact:any =  state?.contact;

  
  const [btnLoading, setbtnLoading] = useState(false);
  const onFinish = (values: any) => {
    const data = {
      ...contact,
      ...values,
      date_of_birth: values?.date_of_birth?.format(dateFormat),
      id: contact ? contact.id : null
    };
    setbtnLoading(true);
    handleSubmitForm(data);
  };

  const handleSubmitForm = async (values:JSON) =>{
    const show = message.loading('Saving Values ...', 0);
    setbtnLoading(false);
    try {
    const {data}  =  await Axios.post(`contacts`,values);
    setTimeout(show, 0);
     if(data?.contact){
      message.success("Registration data stored successfully.");
      setbtnLoading(false);
      history.push('/confirm',data);
     }
    } catch (error) {
      setTimeout(show, 0);
      setbtnLoading(false);
      if (error?.response?.data?.errors) {
        const {email,mobile,player_type,birth_certificate,passport_photo} = error?.response?.data?.errors;
        if (email) message.warning(email?.[0]);
        if (mobile) message.warning(mobile?.[0]);
        if (player_type) message.warning(birth_certificate?.[0]);
        if (passport_photo) message.warning(passport_photo?.[0]);
      }
    }
  }


  return (
    <AppLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
        <Breadcrumb.Item>New Registration</Breadcrumb.Item>
      </Breadcrumb>
      <Form name="register" onFinish={onFinish} scrollToFirstError={true} layout="vertical" >
        <RegisterForm btnLoading={btnLoading} contact={contact}/>
      </Form>
    </AppLayout>
  );
}


const dateFormat = 'DD-MM-YYYY';