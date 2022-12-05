import MenuItem from "../../header/Menu";
import { Layout, Menu, Pagination, List } from "antd";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [userdates, setUserdate] = useState([]);

  const token = import.meta.env.VITE_APP_TOKEN;

  useEffect(() => {
    const request = async function () {
      try {
        const response = await fetch(
          "https://gorest.co.in/public/v2/users?page=1&per_page=20",
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

    request();
  }, []);

  return (
    <>
      <MenuItem />
      <List
        itemLayout="horizontal"
        dataSource={userdates}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.status}
            />
            <div>Content</div>
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;
