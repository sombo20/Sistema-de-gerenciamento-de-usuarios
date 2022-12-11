import MenuItem from "../../header/Menu";
import { notification} from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import FormUser from "../../components/Form";

const Register = () => {
  const token = import.meta.env.VITE_APP_TOKEN;
  const url = import.meta.env.VITE_APP_URL;
  
 
 

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "Registed",
      description: "Success,User registed",
      duration: 0,
    });
  };

  const openNotificationMailer = () => {
    api.open({
      message: "Email ",
      description: "Invalid email",
      duration: 0,
    });
  };


  async function sendDates(name,email,gender,status):string{
    try {
      const dates = JSON.stringify({
        name: `${username}`,
        email: `${email}`,
        gender: `${gender}`,
        status: `${status}`,
      });

      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: dates,
      });

      const data = await response.json();
      alert(data)
        //openNotification();
       // onReset();
      
    } catch (error) {
      alert(error)
    }
  }

  /*const onReset = () => {
    form.resetFields();
  };*/
 
  const { Title } = Typography;

   

  return (
    <>
      <MenuItem />
      {contextHolder}
      <Row>
        <Col span={8} offset={10}>
          <Title>Register new user</Title>
        </Col>
      </Row>
      <FormUser UserFunction={sendDates}/>
    </>
  );
};

export default Register;
