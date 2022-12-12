import MenuItem from "../../header/Menu";
import { notification,Col, Row, Typography } from "antd";
import { useEffect} from "react";
import { useParams } from "react-router-dom";
import FormUser from "../../components/Form";


const EditUser = () => {
  const { id } = useParams();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [status, setStatus] = useState<string>("");
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

  async function updateUser(username:string,useremail:string,usergender:string,userstatus:string,form){
    
  try {  
      const dates = JSON.stringify({
        name:  username,
        email: useremail,
        gender: usergender,
        status: userstatus,
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

/*
  async function request(){
      try {
        const response = await fetch(`${url}${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

       const data = await response.json();
        setUsername(data.name)
        setEmail (data.email)
        setGender(data.gender)
        setStatus(data.status)
        alert(data.name)
      } catch (error) {
        
      }
    };

  useEffect(()=>{
     request()
   },[]);
*/
  
  const { Title } = Typography;

  return (
    <>
      <MenuItem />
      {contextHolder}
      <Row>
        <Col span={8} offset={10}>
          <Title>Update User</Title>
        </Col>
      </Row>
     <FormUser UserFunction={updateUser} name={""} userEmail={""} userGender={""} userStatus={""}/>
     </>
  );
}; 

export default EditUser;
