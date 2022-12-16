import React from "react";
import { Menu } from "antd";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface Props {
  active?: "list" | "register"
}

const MenuItem = ({active}: Props) => (
  <Menu mode="horizontal" defaultSelectedKeys={[active ?? ""]}>
    <Menu.Item key="list" icon={<UserOutlined />}>
      <Link to="/">List Users</Link>
    </Menu.Item>
    <Menu.Item key="register" icon={<UserAddOutlined />}>
      <Link to="/register">Register new User</Link>
    </Menu.Item>
  </Menu>
);

export default MenuItem;
