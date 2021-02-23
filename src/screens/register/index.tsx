import React, { useState } from 'react';
import AppLayout from '@layout/app';
import RegisterForm from '@components/RegisterForm';
import { Breadcrumb, Form } from 'antd';
import { useHistory } from 'react-router-dom';

// tslint:disable-next-line:function-name
export default function Register(props:any) {
  const history = useHistory();
  const def = props?.history?.location?.state;
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
    history.push({pathname:"/confirm",state:values})
  }


  return (
    <AppLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
        <Breadcrumb.Item>New Registration</Breadcrumb.Item>
      </Breadcrumb>
      <Form name="register" onFinish={onFinish} scrollToFirstError={true} layout="vertical">
        <RegisterForm btnLoading={btnLoading} default={def}/>
      </Form>
    </AppLayout>
  );
}


const dateFormat = 'DD-MM-YYYY';