import MenuItem from "../../header/Menu";
import { List, Space } from "antd";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [userdates, setUserdate] = useState();
  const token = import.meta.env.VITE_APP_TOKEN;
  const request = async function (page: any) {
    try {
      const response = await fetch(
        `https://gorest.co.in/public/v2/users?page=1&per_page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
    } catch (error) {}
  };

  useEffect(() => {
    request(2);
  }, []);

  const data = Array.from({ length: 4 }).map((_, i) => ({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  }));

  return (
    <>
      <MenuItem />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 2,
        }}
        dataSource={data}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;
