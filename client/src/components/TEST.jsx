import { Layout, Anchor, Row,Menu, Col } from "antd";
import { useState } from "react";
import styles from "./Header/Header.module.css"
import dogIcon from "../assets/images/dogiconedit.png";
import { ADD_USER, LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { MenuOutlined, MenuFoldOutlined } from "@ant-design/icons";
// const { Link } = Anchor;
const { Header } = Layout;

const Test = () => {
  const [collapsed, setCollapsed] = useState(false);

  const showDrawer = () => {
    setCollapsed(true);
  };
  const onClose = ()  => {
    setCollapsed(false)
  }
 const toggleCollapse = () => {
  setCollapsed(!collapsed)
 }
  const handleMenuClick = () => {
    console.log(hello);
  };
  const logout = (event) => {
    event.preventDefault();
    console.log("logout clicked")
    Auth.logout();
  };

  return (
      <Header className={"header"}>
        <Row>
          <Menu
            // theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            className={`header menu ${collapsed ? "collapsed" : ""}`}
          >
            <Menu.Item key="0">
              <div className="logobox">
                <img src={dogIcon} alt="Logo" className="logo" />
                <h1 className="title">Bone To Pick</h1>
              </div>
            </Menu.Item>

            <Menu.Item key="1" onClick={handleMenuClick}>
              Profile
            </Menu.Item>
            <Menu.Item key="2" onClick={handleMenuClick}>
              Login
            </Menu.Item>
            <Menu.Item key="3" onClick={handleMenuClick}>
              Sign Up
            </Menu.Item>
            {/* Add more menu items as needed */}
          <div className="hamburger-menu" onClick={toggleCollapse}>
            {" "}
            <MenuOutlined />
            bone
          </div>
          </Menu>
          {/* Add the rest of your content */}
        </Row>
      </Header>
  //   <Header className="header">
  //     <Row>
  //     <div className="logobox">
  //       <img src={dogIcon} alt="Logo" className={styles.logo} />
  //       <h1 className={styles.title}>Bone To Pick</h1>
  //     </div>
  //     <div className="mobileHidden">
  //       {/* <Anchor targetOffset={"65"}> */}
  //         <Link to="home" title = "Home"/>
  //         {Auth.loggedIn() ? (
  //           <Link  onClick={logout} title="Logout" />
  //         ) :(
  //           <>
  //             <Link to = "login" title="Login" />     
  //             <Link to = "signup" title = "Signup" /></>

  //         )}
          
  //       {/* </Anchor> */}
  //     </div>
  //     </Row>
  //   </Header>
  );
};

export default Test;
