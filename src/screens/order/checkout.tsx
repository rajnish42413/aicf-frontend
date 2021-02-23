import React, { useEffect, useState } from 'react';
import { Button, Layout, Result, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import Axios from 'axios';



// tslint:disable-next-line:function-name
export default function Checkout() {
    const history = useHistory();
    const { state }:any = useLocation();
    const data: any = state?.order;
    const contact: any = data?.contact;
    const order:any = data?.order;
    const [btnLoading, setbtnLoading] = useState(false);


    const handleCheckout = async (response: any) => {
        setbtnLoading(true);

        const value = {
            payment_response_id: response.razorpay_payment_id,
            channel: 'razorpay',
        };
        console.log(value);
        try {
            // const { data } = await Axios.post(`orders/${order?.id}/checkout`, value);
            // history.push('/payment/success', data);
            setbtnLoading(false);
            return;
        } catch (error) {
            setbtnLoading(false);
        }
    };

    const handlePayment = async () => {

        if(!contact){
            message.error("Contact detail no found in our database");
        }

        if(!order?.amount){
          message.error("Order Amount not found");
        }

        const amount = order.amount;
        const options = {
            key: 'rzp_test_hNtKQvpYRE730Z',
            key_secret: 'kBrFjTWgJH20GZE2B0RJrXgZ',
            amount: +(amount) * 100, // 2000 paise = INR 20, amount in paisa
            name: 'ALL INDIA CHESS FEDERATION',
            description: `ALL INDIA CHESS FEDERATION`,
            callback_url:"",
            order_id:order.id,
            handler(response: any) {
                handleCheckout(response);
            },
            prefill: {
                name: contact?.name,
                email: contact?.email,
                contact: contact?.mobile,
            },
            notes: {
                address: 'Hello World',
            },
        }
        const {data} = await Axios.post(`https://api.razorpay.com/v1/checkout/embedded`,options);

        console.log(data);
    };

    useEffect(() => {
        // const script = document.createElement('script');
        // script.src = 'https://api.razorpay.com/v1/checkout/embedded';
        // script.async = true;
        // document.body.appendChild(script);
    }, [history]);


    return (
        <Layout style={{backgroundColor:'#fff',paddingTop:'5vh'}}>
            <Layout.Content>
                <Result
                    status="success"
                    icon={<SmileOutlined />}
                    title="Successfully Register to AICF!"
                    subTitle={`Email: ${contact?.email}, Phone Number: ${contact?.mobile}`}
                    extra={[
                        <Button onClick={handlePayment} loading={btnLoading} type="primary" size="large" key="1">Pay Now</Button>,
                    ]}
                />
            </Layout.Content>
        </Layout>
    )
}
