import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import MenuItem from "../../header/Menu"
import { DeleteOutlined } from '@ant-design/icons';
import { Card ,Button,Spin, Space} from 'antd';
import { Link,useNavigate} from "react-router-dom";


const { Meta } = Card;

interface Userdates{
  id:number,
  name:string,
  email:string,
  gender:string,
  status:string
}

export default function ShowUserDetails(){
    const {id} = useParams()
    const [userdates,setUserdate] = useState<Userdates>({id:0,name:"",email:"",gender:"",status:""});
    const naviagate = useNavigate();
    const [load,setLoad] = useState(false)
    useEffect(()=>{

     

      const request = async function(){
      const token:string = "6d0b476b75722346175107c721f473de218526ace3a7fc9a9fa1139f862a22e7"
      
         try{
             setLoad(true)
             const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`,{
               method:"GET",
               headers:{
              Authorization:`Bearer ${token}`,
              'Content-Type':'application/json'
               },
             });

             const data = await response.json();
             setUserdate({id:data.id,name:data.name,email:data.email,gender:data.gender,status:data.status});
             //alert(data.id)
         }catch(error){
            //alert("Request error ,please wait and try again")
         }finally{
          setLoad(false)
         }
      }

      request();
    },[])

   const handleDelete = async (id:number)=>{
    
         const token:string = "6d0b476b75722346175107c721f473de218526ace3a7fc9a9fa1139f862a22e7"
         
            try{
                const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`,{
                  method:"DELETE",
                  headers:{
                 Authorization:`Bearer ${token}`,
                 'Content-Type':'application/json'
                  },
                });
   
                const data = await response.json();
                alert("Users deleted")
                naviagate("/")
            }catch(error){
             alert("Request error ,please try again")
            }
      }

    return(
        <>
        <MenuItem/>
        {
         load &&  
         <Space size="middle">
          <Spin size="large" />
        </Space>
        }
        <Card
       
            style={{ width: 300 }}
        >

        <p>Name: {userdates.name}</p>
        <p>Email: {userdates.email}</p> 
        <p>Gender: {userdates.gender}</p>  
        <p>Status: {userdates.status}</p>

       
        <Button  onClick={()=>handleDelete(userdates.id)}>
          Delete
        </Button>
        <Link to={`/edit/user/${userdates.id}`}>
          Edit
        </Link> 
      </Card>
      </>
   )
}
