import { Button,Form, Input, Radio } from "antd";
import { Col, Row } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useState ,useEffect} from "react";

interface USER{
  UserFunction:()=>void,
  name:string,
 }



function FormUser({UserFunction,name}):USER{

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  
  const [form] = Form.useForm()
  
  const onFinish = () => {
       UserFunction(username,email,gender,status,form);
   }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  form.setFieldsValue({username:name});

  return (
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
                Send
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
  );
};

export default FormUser;
