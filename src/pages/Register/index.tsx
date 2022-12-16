import MenuItem from "../../header/Menu";
import { notification, Form, Col, Row ,Typography } from "antd";
import FormUser from "../../components/Form";

const Register = () => {
  const [form] = Form.useForm()
  const token = import.meta.env.VITE_APP_TOKEN;
  const url = import.meta.env.VITE_APP_URL;
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (title:string,message:string) => {
    api.open({
      message: title,
      description: message,
      duration: 0,
    });
  };


  async function sendDates(){
    
  try {
      const dates = JSON.stringify(form.getFieldsValue());

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
         openNotification("Register","User Registed")
         form.resetFields()
      }else if(data[0].message.indexOf("has already been taken") != -1){
        openNotification(data[0].field,data[0].message)
     }else{
        openNotification("null", "invalid dates")
    }   
      
    }catch(error){}
  }

 
  const { Title } = Typography;

  return (
    <>
      <MenuItem active="register" />
      {contextHolder}
      <Row>
        <Col span={8} offset={10}>
          <Title>Register new user</Title>
        </Col>
      </Row>
      <FormUser form={form} onSubmit={sendDates} />
    </>
  );
};

export default Register;
