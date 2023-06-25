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
  if (Auth.loggedIn()) {
    console.log(Auth.getProfile());
    const username = Auth.getProfile();
    return (
      <Menu
        mode={mode}
        style={{
          backgroundColor: "#df9a5c",
        }}
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
            <CodeOutlined />{" "}
            <Link to={`/profile/${username.data._id}`}>Profile</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Link to="/" onClick={logout}>
              <LogoutOutlined /> Logout
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  } else {
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

  }
};

export default RightMenu;

