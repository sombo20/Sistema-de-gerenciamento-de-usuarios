import React from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined,UserOutlined ,UserAddOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const MenuItem = () => (
  <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
    <Menu.Item key="list" icon={<UserOutlined />}>
    <Link to="/">LIst Users</Link>
    </Menu.Item>
    <Menu.Item key="register" icon={<UserAddOutlined />}>
      <Link to="/register">Register new user</Link>
    </Menu.Item>
  </Menu>
);

export default MenuItem;