import MenuItem from "../../header/Menu";
import { Button, notification, Checkbox, Form, Input, Radio } from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";

const Register = () => {
  const [form] = Form.useForm();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [status, setStatus] = useState<string>("");
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

  function emailValidation() {
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
    emailValidation() ? sendDates() : openNotificationMailer();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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

      <Row>
        <Col span={14} offset={9}>
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                { required: true, message: "Please choose your gender!" },
              ]}
            >
              <Radio.Group onChange={(e) => setGender(e.target.value)}>
                <Radio value="male"> Male </Radio>
                <Radio value="female"> Female </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="state"
              name="status"
              rules={[
                { required: true, message: "Please choose your status!" },
              ]}
            >
              <Radio.Group onChange={(e) => setStatus(e.target.value)}>
                <Radio value="active"> Active </Radio>
                <Radio value="inactive"> Inactive </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
