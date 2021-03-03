import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Button, message, Descriptions, Badge } from 'antd';
import Axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

export default function Confirm(props: any) {
  const [btnLoading, setbtnLoading] = useState(false);
  const history = useHistory();
  const { state } = useLocation();
  const contact:any = state;

  const handleSubmitForm = async () => {
    const show = message.loading('Saving Values ...', 0);
    setbtnLoading(true);
    try {
      const {data}  =  await Axios.post(`contacts`,contact);
      setbtnLoading(false);
       if(data?.contact){
        message.success("Registration data stored successfully.");
        history.push(`/checkout`, data.contact);
       }
    } catch (error) {
      setbtnLoading(false);
      setTimeout(show, 0);
    }
  };

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
