import MenuItem from "../../header/Menu";
import { notification, Col, Row ,Typography } from "antd";
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
      duration: 0,
    });
  };


  async function sendDates(userName:string,userEmail:string,userGender:string,userStatus:string,form){
    
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
     
      if(data.name){
         openNotification("User Registed")
         form.resetFields()
      }else if(data[0].message.indexOf("has already been taken") != -1){
        openNotification(data[0].message)
     }else{
      openNotification("null")
    }

    
    
       
      
    } catch (error) {
      alert(error)
    }
  }

 
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
