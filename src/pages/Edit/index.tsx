import MenuItem from "../../header/Menu";
import { notification, Col , Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import FormUser from "../../components/Form";
import { useState} from 'react'

const EditUser = () => {

  const { id } = useParams();
  const [name,setName] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();
  const token = import.meta.env.VITE_APP_TOKEN;
  const url = import.meta.env.VITE_APP_URL;
  
  const openNotification = (title:string,message:string) => {
    api.open({
      message: title,
      description: message,
      duration: 0,
    });
  };

  async function updateUser(userName:string,userEmail:string,userGender:string,userStatus:string,form){
    
  try {  
      const dates = JSON.stringify({
        name:  userName,
        email: userEmail,
        gender: userGender,
        status: userStatus,
      });

      const response = await fetch(`${url}${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: dates,
      });

      const data = await response.json();
      if(data.name){
         openNotification("Edition","Success")
      }else if(data[0].message.indexOf("has already been taken") != -1){
        openNotification(data[0].field,data[0].message)
     }else if(data[0].message.indexOf( "is invalid") != -1){
       openNotification(data[0].field,data[0].message)
     }else{
       openNotification(data[0].field,data[0].message)
    }
      
    } catch (error) {
    }
  }
  
  const { Title } = Typography;
    setName("Miguel")
  return (
    <>
      <MenuItem />
      {contextHolder}
      <Row>
        <Col span={8} offset={10}>
          <Title>Update User</Title>
        </Col>
      </Row>
     <FormUser UserFunction={updateUser} name={a} userEmail={"email"} userGender={"male"} userStatus={"active"}/>
     </>
  );
}; 

export default EditUser;
