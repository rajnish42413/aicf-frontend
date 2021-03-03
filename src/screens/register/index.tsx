import React, { useState } from 'react';
import AppLayout from '@layout/app';
import RegisterForm from '@components/RegisterForm';
import { Breadcrumb, Form, message } from 'antd';
import { useHistory } from 'react-router-dom';
import Axios  from 'axios';

export default function Register(props:any) {
  const history = useHistory();
  const [btnLoading, setbtnLoading] = useState(false);
  const onFinish = (values: any) => {

    const data = {
      ...values,
      DOB: values.DOB?.format(dateFormat),
    };
    setbtnLoading(true);
    handleSubmitForm(data);
  };

  const handleSubmitForm = async (values:JSON) =>{
    setbtnLoading(false);
    try {
    const {data}  =  await Axios.post(`contacts`,values);
     if(data?.contact){
      message.success("Registration data stored successfully.")
      history.push('/confirm',data.contact);
     }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <AppLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
        <Breadcrumb.Item>New Registration</Breadcrumb.Item>
      </Breadcrumb>
      <Form name="register" onFinish={onFinish} scrollToFirstError={true} layout="vertical">
        <RegisterForm btnLoading={btnLoading}/>
      </Form>
    </AppLayout>
  );
}


const dateFormat = 'DD-MM-YYYY';