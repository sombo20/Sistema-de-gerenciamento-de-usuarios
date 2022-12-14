import MenuItem from "../../header/Menu";
import { notification, Col , Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useState,useEffect } from 'react'
import FormUser from "../../components/Form";

interface Userdates {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}


const EditUser = () => {

  const { id } = useParams(); 
  const [api, contextHolder] = notification.useNotification();
  const token = import.meta.env.VITE_APP_TOKEN;
  const url = import.meta.env.VITE_APP_URL;
  const [userdates, setUserdate] = useState<Userdates>({
    id: 0,
    name: "",
    email: "",
    gender: "",
    status: "",
  });
  const openNotification = (title:string,message:string) => {
    api.open({ 
      message: title,
      description: message,
      duration: 2,
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


useEffect (()=>{
   /*const request = async () =>{
      try {
        const response = await fetch(`${url}${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

       const data = await response.json();      
          setUserdate({
          id: data.id,
          name: data.name,
          email: data.email,
          gender: data.gender,
          status: data.status,
        });
      } catch (error) {
        
      }
   }

    request()
    */

    await fetch(`${url}${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).then((response)=>{
           
          const data = await response.json();      
          setUserdate({
          id: data.id,
          name: data.name,
          email: data.email,
          gender: data.gender,
          status: data.status,
        });
     })
},[])

  const { Title } = Typography;
  const t = userdates.name
  alert(t)
  return (
    <>
      <MenuItem />
      {contextHolder}
      <Row>
        <Col span={8} offset={10}>
          <Title>Update User {userdates.id}</Title>
        </Col>
      </Row>
     <FormUser UserFunction={updateUser} name={"12345"} userEmail={"email"} userGender={"male"} userStatus={"active"}/>
     </>
  );
}; 

export default EditUser;
