import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Button, message, Descriptions, Badge } from 'antd';
import Axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { RZ_AUTH } from '@constants/general';

export default function Confirm(props: any) {
  const [btnLoading, setbtnLoading] = useState(false);
  const history = useHistory();
  const { state } = useLocation();
  const contact:any = state;

  console.log(contact)

  const dummy = {"status":"ok","message":"Inserted Successfully","contact":{"first_name":"rajnish","last_name":"singh","email":"rajnish42413@gmail.com","mobile":"8808100876","son_daughter_of":"ee","relationship":"Son","mother_tounge":"eee","gender":"M","address":"efre","city":"rere","district":"rer","state":"rere","updated_at":"2021-03-05T12:03:31.000000Z","created_at":"2021-03-05T12:03:31.000000Z","id":11}};
  const handleSubmitForm = async () => {
    const show = message.loading('Saving Values ...', 0);
    setbtnLoading(true);
    try {
      // const {data}  =  await Axios.post(`contacts`,contact);
      const data = dummy;
      setbtnLoading(false);
       if(data?.contact){
        message.success("Registration data stored successfully.");
        generateOrder(data.contact);
       }
    } catch (error) {
      setbtnLoading(false);
      setTimeout(show, 0);
    }
  };

  const generateOrder = async (contact:any) =>{
    try {
      const {data} = await Axios.post(`https://api.razorpay.com/v1/orders`,{
        "amount": 50,
        "currency": "INR",
        "receipt": `receipt#${contact?.id}`,
      },{
        auth:  RZ_AUTH
      });
      console.log(data);
      history.push(`/checkout`, {contact,order:data});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
        <Breadcrumb.Item>Confirm Details</Breadcrumb.Item>
      </Breadcrumb>

      <Descriptions title="Confirm Contact Information" bordered={true}>
        <Descriptions.Item label="First Name">{contact?.first_name}</Descriptions.Item>
        <Descriptions.Item label="Middle Name">{contact?.middle_name}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{contact?.last_name}</Descriptions.Item>

        <Descriptions.Item label="Email">{contact?.email}</Descriptions.Item>
        <Descriptions.Item label="Mobile No" span={2}>
          {contact?.mobile}
        </Descriptions.Item>

        <Descriptions.Item label="Son/Daughter of" >{contact?.son_daughter_of}</Descriptions.Item>
        <Descriptions.Item label="Relationship">{contact?.relationship}</Descriptions.Item>
        <Descriptions.Item label="Mother Tounge">{contact?.mother_tounge}</Descriptions.Item>

        <Descriptions.Item label="Gender" span={1}>
          <Badge status="processing" text={contact?.gender} />
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth" span={2}>{contact?.date_of_birth}</Descriptions.Item>

        <Descriptions.Item label="Address" span={1}>{contact?.address}</Descriptions.Item>
        <Descriptions.Item label="Config Info" span={2}>
          City: <b>{contact?.city}</b>
          <br />
          district: <b>{contact?.district}</b>
          <br />
          State: <b>{contact?.state}</b>
          <br />
        </Descriptions.Item>

        <Descriptions.Item label="Payer Type" span={1}>
          <Badge status="processing" text={contact?.player_type} />
        </Descriptions.Item>
        <Descriptions.Item label="Are you a PIO/OCI" span={2}>{contact?.POI}</Descriptions.Item>
      </Descriptions>
      <div style={{ margin: '16px 0' }}>
        <Button type="primary" loading={btnLoading} onClick={() => handleSubmitForm()} size="large">
         Confirm
       </Button>
        <Button  size="large" style={{margin:'0 1rem'}}>Edit</Button>
      </div>
    </AppLayout>
  );
}
