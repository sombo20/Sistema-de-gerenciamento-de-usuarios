import React from "react";
import { Menu } from "antd";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const MenuItem = () => (
  <Menu mode="horizontal" defaultSelectedKeys={["list"]}>
    <Menu.Item key="list" icon={<UserOutlined />}>
      <Link to="/">LIst Users</Link>
    </Menu.Item>
    <Menu.Item key="list1" icon={<UserAddOutlined />}>
      <Link to="/register">Register new User</Link>
    </Menu.Item>
  </Menu>
);

export default MenuItem;
