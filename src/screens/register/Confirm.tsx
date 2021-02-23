import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Row, Col, Button, message } from 'antd';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Confirm(props: any) {
  const [btnLoading, setbtnLoading] = useState(false);
  const history = useHistory();
  const values = props.history.location.state;

  const handleSubmitForm = async () => {
    const show = message.loading('Saving Values ...', 0);
    setbtnLoading(true);
    try {
      const { data } = await Axios.post(`register`, values);
      setTimeout(show, 0);
      setbtnLoading(false);
      if (data) {
        history.push(`/checkout`, { order: data });
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
      {/* <Form name="register" onFinish={() => {}} scrollToFirstError={true} layout="vertical"> */}
      <>
        <Row gutter={[30, 20]}>
          <Col span={8}>
            <h3>First Name</h3>
            <h2>{values['first_name']}</h2>
          </Col>

          <Col span={8}>
            <h3>Middle Name</h3>
            <h2>{values['middle_name']}</h2>
          </Col>

          <Col span={8}>
            <h3>Last Name</h3>
            <h2>{values['last_name']}</h2>
          </Col>
        </Row>

        <Row gutter={[30, 20]}>
          <Col span={12}>
            <h3>Email</h3>
            <h2>{values['email']}</h2>
          </Col>
          <Col span={12}>
            <h3>Mobile No.</h3>
            <h2>{values['mobile']}</h2>
          </Col>
        </Row>

        {/* Row number 3 */}

        <Row gutter={[30, 20]}>
          <Col span={12}>
            <h3>Son/Daughter of</h3>
            <h2>{values['son_daughter_of']}</h2>
          </Col>

          <Col span={12}>
            <h3>Relationship</h3>
            <h2>{values['relationship']}</h2>
          </Col>
        </Row>

        {/* Row number 4 */}

        <Row gutter={[30, 40]}>
          <Col span={12}>
            <h3>Mother Tounge</h3>
            <h2>{values['mother_tounge']}</h2>
          </Col>

          <Col span={12}>
            <h3>Gender</h3>
            <h2>{values['gender']}</h2>
          </Col>
        </Row>

        {/* Row number 5 */}

        <Row gutter={[30, 20]}>
          <Col span={12}>
            <h3>Date of Birth</h3>
            <h2>{values['DOB']}</h2>
          </Col>
          <Col span={12}>
            <h3>Address</h3>
            <h2>{values['address']}</h2>
          </Col>
        </Row>

        <Row gutter={[30, 20]}>
          <Col span={12}>
            <h3>City</h3>
            <h2>{values['city']}</h2>
          </Col>

          <Col span={12}>
            <h3>District</h3>
            <h2>{values['district']}</h2>
          </Col>
        </Row>
        <Row gutter={[30, 20]}>
          <Col span={12}>
            <h3>State</h3>
            <h2>{values['state']}</h2>
          </Col>
        </Row>

        {/* Row number 6 */}

        <Row gutter={[200, 20]} style={{ marginTop: 10, marginBottom: 20 }}>
          <Col>
            <h3>Player Type</h3>
            {/* <h3>First Name</h3> */}
            <h2>{values['player_type']}</h2>
          </Col>
          <Col>
            <h3>Are you a PIO/OCI</h3>
            {/* <h3>First Name</h3> */}
            <h2>{values['POI']}</h2>
          </Col>
        </Row>
        <Row style={{ marginTop: 10, marginBottom: 20 }}>
          <Col span={2}>
            <Button
              type="primary"
              onClick={() => history.push({ pathname: '/new-register', state: values })}
            >
              Edit
            </Button>
          </Col>
          <Col offset={2} span={2}>
            <Button type="primary" loading={btnLoading} onClick={() => handleSubmitForm()}>
              Confirm
            </Button>
          </Col>
        </Row>
      </>
    </AppLayout>
  );
}
