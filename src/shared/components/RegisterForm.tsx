import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Upload,
  Radio,
  DatePicker,
  message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { API_URL } from '../../constants/general';
import Axios from 'axios';
import Loader from './loader/Loader';
import { IPlayerType } from '../../schemas/IPlayertypes.d';

const dateFormat = 'DD-MM-YYYY';

export default function RegisterFormItems(props: any) {
  const { btnLoading, contact } = props;
  const [playerTypes, setPlayerTypes] = useState<IPlayerType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const IFProps = {
    name: 'image',
    action: `${API_URL}contacts/add-image`,
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const getData = async () => {
    setIsLoading(true);
    const { data } = await Axios.get(`players`);
    setPlayerTypes(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [])

  return isLoading ? <Loader /> :
    <>
      <Row gutter={[30, 20]}>
        <Col span={8}>
          <Form.Item
            name="first_name"
            label="First Name"
            initialValue={contact?.first_name}
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input placeholder="First name" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="middle_name" label="Middle Name" initialValue={contact?.middle_name}>
            <Input placeholder="Middle name" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="last_name"
            label="Last Name"
            initialValue={contact?.last_name}
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item
            initialValue={contact?.email}
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter valid email' }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="mobile"
            initialValue={contact?.mobile}
            label="Mobile Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { max: 10, min: 10, message: 'Please enter valid phone number!' }
            ]}
          >
            <Input type="number" placeholder="Mobile number" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row number 3 */}

      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item
            name="son_daughter_of"
            label="Son/Daugher of"
            initialValue={contact?.son_daughter_of}
            rules={[
              {
                required: true,
                message: 'Please add your fathers name!'
              }
            ]}
          >
            <Input placeholder="father/mother or parent name" />
          </Form.Item >
        </Col>

        <Col span={12}>
          <Form.Item
            name="relationship"
            initialValue={contact?.relationship}
            label="Relationship"
            rules={[{ required: true, message: 'Select Relationship' }]}
          >
            <Select options={relation} placeholder="Select Relationship" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row number 4 */}

      <Row gutter={[30, 40]}>
        <Col span={12}>
          <Form.Item
            name="mother_tounge" label="Mother Tounge" initialValue={contact?.mother_tounge}>
            <Input placeholder="eg. Hindi ,English or ...." />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="gender"
            label="Gender"
            initialValue={contact?.gender}
            rules={[{ required: true, message: 'Add Gender' }]}
          >
            <Select options={gender} placeholder="Select Gender" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row number 5 */}

      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item
            name="date_of_birth"
            label="Date of Birth"
            rules={[{ required: true, message: 'Select DOB' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              showToday={false}
              disabledDate={disabledDate}
              format={dateFormat}
              placeholder="DD-MM-YYYY"
              value={contact?.date_of_birth}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            initialValue={contact?.address}
            name="address" label="Address">
            <Input.TextArea rows={1} placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item
            initialValue={contact?.city}
            name="city" label="City" rules={[{ required: true, message: 'Add City' }]}>
            <Input placeholder="City name" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="district"
            initialValue={contact?.district}
            label="District"
            rules={[{ required: true, message: 'Add District' }]}
          >
            <Input placeholder="District name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item
            initialValue={contact?.state}
            name="state" label="State" rules={[{ required: true, message: 'Add State' }]}>
            <Input placeholder="State name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[200, 20]} style={{ marginTop: 10, marginBottom: 20 }}>
        <Col>
          <Form.Item 
          name="player_type" 
          label="Player Type" 
          rules={[{ required: true }]}>
            <Checkbox.Group >
              {playerTypes?.map(item =>
                <Checkbox value={item.id} key={item.slug}>{item.name}</Checkbox>
              )}
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="poi" label="Are you a PIO/OCI" initialValue={contact?.poi}>
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>


      <Row style={{ marginTop: '30px' }}>
        <Col span={5}>
          <Upload {...IFProps}>
            <Button type="default" icon={<UploadOutlined />}>
              Passport Size Photo
            </Button>
          </Upload>

          <p style={{ marginTop: 20 }}>
            (jpg or png images only. 160x200 pixels (width x height). Maximum size 1000 KB)
          </p>
        </Col>
        <Col span={8} offset={4}>
          <Upload {...IFProps}>
            <Button type="default" icon={<UploadOutlined />}>
              Birth Certificate
            </Button>
          </Upload>
          <p style={{ marginTop: 20 }}>(Maximum size 1000 KB)</p>
        </Col>
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col>
          <Button type="primary" size="large" htmlType="submit" loading={btnLoading}>
            Submit Form
          </Button>
        </Col>
      </Row>
    </>
}

function disabledDate(current: any) {
  return current && current > moment().endOf('day');
}

const gender = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
  { label: 'Other', value: 'O' }
];

const relation = [
  { label: 'Daughter', value: 'Daugher' },
  { label: 'Son', value: 'Son' },
  { label: 'Husband', value: 'Husband' },
  { label: 'Brother', value: 'Brother' },
  { label: 'Sister', value: 'Sister' }
];


