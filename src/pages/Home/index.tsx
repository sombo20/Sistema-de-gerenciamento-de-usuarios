import MenuItem from "../../header/Menu";
import { useState } from "react";
import { List, Space } from "antd";
import {Link} from 'react-router-dom'

const Home = () => {
  const token = import.meta.env.VITE_APP_TOKEN;
  const [userdates, setUserdate] = useState([]);
 const [Pages,setTotalPages] = useState<any>(null)
 let  page:string = Pages
 let Total  = +page;
 const [loading,setLoading] = useState (false)
 
 

  const paginate = async function (page: any) {
    try {
      setLoading(true)
      const response = await fetch(
        `https://gorest.co.in//public/v2/users?page=${page}&per_page=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setUserdate(data);
      setTotalPages(response.headers.get("X-Pagination-Pages"))
      
      
      
    } catch (error) {}finally{
      setLoading(false)
    }
  };

  
  return (
    <>
      <MenuItem />
      <List
        loading={loading}
        pagination={{
          pageSize:10,
          total:Total,
          onChange:(page)=>{
            paginate(page)
          }
        }}
        dataSource={userdates}
        renderItem={(item: any) => (
          <List.Item key={item.id}>
            <List.Item.Meta title={item.name} description={item.status} />
            <Space size={10}>
              <Link to={`/edit/user/${item.id}`}>Edit</Link>
              <Link to={`/show/user/${item.id}`}>more</Link>
            </Space>
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;
