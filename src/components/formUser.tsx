import { Button, Checkbox, Form, Input, Radio } from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

const formUser = ({form}) => {
  
  return (
    <>
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
       
                onChange={valueChange}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                
                onChange={valueChange}
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
              <Radio.Group onChange={valueChange}>
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
              <Radio.Group onChange={valueChange}>
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

export default formUser;
