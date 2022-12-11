import MenuItem from "../../header/Menu";
import { notification, Form} from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import FormUser from "../../components/Form";

const Register = () => {
  const token = import.meta.env.VITE_APP_TOKEN;
  const url = import.meta.env.VITE_APP_URL;
  const [form] = Form.useForm();
 

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

 /* function emailValidation() {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email) === false) {
      return false;
    }
    return true;
  }

  async function sendDates() {
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
      if (typeof data == "object") {
        openNotification();
        onReset();
      }
    } catch (error) {
      //alert(error)
    }
  }

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = () => {
    //emailValidation() ? sendDates() : openNotificationMailer();
    alert()
};

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
      <FormUser Form={form}/>
    </>
  );
};

export default Register;
