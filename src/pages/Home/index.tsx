import MenuItem from "../../header/Menu";
import { Layout, Menu,Pagination ,Card,Button,Row,Col} from 'antd';
import React,{useEffect,useState} from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import "./home.css"
const Context = React.createContext({ name: 'Default' });

const { Content} = Layout;

const Home = ()=>{

  /*
   <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
           LIstar Usuarios
        </div>
      </Content>


       <div className="container" key={post.id}>
          <p>User ID: {post.id}</p>
          <p>Title: {post.name}</p>
        </div>
  
  */

    const [usersPerPage] = useState(5);
    const [offset, setOffset] = useState(1);
    const [users, setAllUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0)
      
    const getUersData = (data:any):any => {
      return (
        data.map((user:any) => 
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
                <Card
                  style={{ width: 300 }}
                  key={user.id}
              >

              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p> 
              <p>Gender: {user.gender}</p>  
              <p>Status: {user.status}</p>

       
      
              <Link to={`/show/user/${user.id}`}>
                View
              </Link> 
           </Card>
          </Col>
        </Row>
      </div>
       )
      )   
    }

    const getAllUsers = async () => {
      const token:string = "6d0b476b75722346175107c721f473de218526ace3a7fc9a9fa1139f862a22e7"
      const res = await fetch('https://gorest.co.in/public/v2/users?page=1&per_page=40',{
        method:"GET",
        headers:{
       Authorization:`Bearer ${token}`,
       'Content-Type':'application/json'
        },
      });

      const data = await res.json();
     
      const slice = data.slice(offset - 1 , offset - 1 + usersPerPage)
    
      
      const postData = getUersData(slice)
    
      
      setAllUsers(postData)
      setPageCount(Math.ceil(data.length / usersPerPage))
    }
    
    const handlePageClick = (event:any) => {
      const selectedPage = event.selected;
      setOffset(selectedPage + 1)
    };
    
    useEffect(() => {
      getAllUsers()
    }, [offset])
    
  return(
    <>
      <MenuItem/>
      <div className="main-app">
    
    <div className="list_user">
      {users}
     </div>
  
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakClassName={"break-me"}
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"active"} />
  </div>
    </>
  )
}

export default Home;