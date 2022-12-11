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

  const openNotification = (message:string) => {
    api.open({
      message: "Registed",
      description: message,
      duration: 5,
    });
  };

  const openNotificationMailer = () => {
    api.open({
      message: "Email ",
      description: "Invalid email",
      duration: 1,
    });
  };


  async function sendDates(userName,userEmail,userGender,userStatus):string{
    
  try {
      const dates = JSON.stringify({
        name:  userName,
        email: userEmail,
        gender: userGender,
        status: userStatus,
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
      const message = data[0].message
      if(message.indexOf("has already been taken") != -1){
        openNotification(message)
     }else{
      alert(data.name)
    }

    
    
       
      
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
