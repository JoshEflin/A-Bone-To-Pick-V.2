import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const logout = (event) => {
  event.preventDefault();
  Auth.logout();
};

const RightMenu = ({ mode }) => {
  return (
    <Menu 
      mode={mode}
      
    >
      <Menu.SubMenu 
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">John Doe</span>
          </>
        }
      >
        <Menu.Item key="profile">
          <CodeOutlined /> <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Link to="/" onClick={logout}>
            <LogoutOutlined /> Logout
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
