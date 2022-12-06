import MenuItem from "../../header/Menu";
import { useEffect, useState } from "react";
import { List } from "antd";

const Home = () => {
  const token = import.meta.env.VITE_APP_TOKEN;
  const [userdates, setUserdate] = useState([]);

  const request = async function (page: any) {
    try {
      const response = await fetch(
        `https://gorest.co.in//public/v2/users?page=1&per_page=${page}`,
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
    } catch (error) {}
  };

  useEffect(() => {
    request(20);
  }, []);

  return (
    <>
      <MenuItem />
      <List
        pagination={{
          pageSize: 5,
          onChange: (page: any) => {
            alert(page);
          },
        }}
        dataSource={userdates}
        renderItem={(item: any) => (
          <List.Item key={item.id}>
            <List.Item.Meta title={item.name} description={item.status} />
            <div>Content</div>
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;
