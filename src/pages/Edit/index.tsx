import MenuItem from "../../header/Menu";
import { Button, notification , Checkbox, Form, Input , Radio} from 'antd';
import { Col, Row } from 'antd';
import { Typography } from 'antd';
import { LockOutlined, UserOutlined ,MailOutlined} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useParams} from 'react-router-dom'


const EditUser = ()=>{
    const [form] = Form.useForm();
    const [username,setUsername] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [gender,setGender] = useState<string>("");
    const [status,setStatus] = useState<string>("");
    const {id} = useParams()
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
      api.open({
        message: 'Edition',
        description:
        'Success,User Edited',
        duration: 0,
      });
    };

    const openNotificationMailer = () => {
      api.open({
        message: 'Email ',
        description:
        'Invalid email',
        duration: 0,
      });
    };
   

   function emailValidation(){
      const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(regex.test(email) === false){
          return false;
      }
      return true;
  }

  async function updateUser(){
      
      try{
        const dates:string = JSON.stringify({
          "name":`${username}`,
          "email":`${email}`,
          "gender":`${gender}`,
          "status":`${status}`,
        });

        const token:string = "6d0b476b75722346175107c721f473de218526ace3a7fc9a9fa1139f862a22e7"
        const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`,{
            method:"PUT",
            headers:{
              Authorization:`Bearer ${token}`,
              'Content-Type':'application/json'
            },
            body:dates
        });

        const data = await response.json();
        
         openNotification()
          
        

      
    }catch(error){
      alert(error)
    }
 }

    const onReset = () => {
      form.resetFields();
    };
  
    const onFinish = () => {
          emailValidation() ? updateUser() : openNotificationMailer()
          
};
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

 
const { Title } = Typography;


useEffect(()=>{
 
  const request = async function(){
    const token:string = "6d0b476b75722346175107c721f473de218526ace3a7fc9a9fa1139f862a22e7"
    
       try{
           const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`,{
             method:"GET",
             headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
             },
           });

           const data = await response.json();
           form.setFieldsValue({
            username:data.name,
            email:data.email,
            status:data.status,
            gender:data.gender,
            
          });
        
       }catch(error){
          //alert("Request error ,please wait and try again")
       }
    }

      
  

    request();
},[])

  return(
    <>
      <MenuItem/>
      {contextHolder}
      <Row>
        <Col span={8} offset={10}>
        <Title>Update User</Title>
        </Col>
      </Row>
     
       <Row>
      <Col span={14} offset={9}>
       <Form
            name="basic"
            form={form}
            labelCol={{ span: 2}}
            wrapperCol={{ span: 10   }}
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input value={username} onChange={(e)=>setUsername(e.target.value)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input value={email} onChange={(e)=>setEmail(e.target.value)}  prefix={<MailOutlined  className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>


      <Form.Item label="Gender" name="gender"
              rules={[{ required: true, message: 'Please choose your gender!' }]}
       >
          <Radio.Group  onChange={(e)=>setGender(e.target.value)}>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="state" name="status"
              rules={[{ required: true, message: 'Please choose your status!' }]}
       >
          <Radio.Group onChange={(e)=>setStatus(e.target.value)}>
            <Radio value="active"> Active </Radio>
            <Radio value="inactive"> Inactive </Radio>
          </Radio.Group>
        </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
       
        </Form.Item>
        </Form>
      </Col>
    </Row>
    </>
  )
}

export default EditUser;