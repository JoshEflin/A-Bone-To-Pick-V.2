import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer,theme, Row, Col} from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Auth from '../../utils/auth'
import dogIcon from '../../assets/images/dogiconedit.png'
import {Link} from 'react-router-dom'

const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  // If you do not want to auto-close the mobile drawer when a path is selected
  // Delete or comment out the code block below
  // From here
  let { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location]);
  // Upto here
  
  const logout = (event) => {
    event.preventDefault();
    console.log("logout clicked")
    Auth.logout();
  };
  return (
    <nav className="navbar">
    
        <Row>
      <Layout>
        <Layout.Header className="header" style={
          {
            backgroundColor:"#df9a5c",
          }
        }>
          {/* <Col span={8}> */}
          <div className="logobox">
          <img src={dogIcon} alt="Logo" className="logo" />
          <h1 className="title"> Bone To Pick</h1>
          
          
             
            </div>
            {/* </Col> */}
            {/* <Col span={8}> */}
              <LeftMenu mode={"horizontal"} />
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            {/* </Col> */}
            <div className="rightMenu">
              <RightMenu mode={"horizontal"} />
            </div>

            <Drawer
              title={"Brand Here"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              open={visible}
              style={{ zIndex: 99999 }}
              >
              <LeftMenu mode={"inline"} />
              <RightMenu mode={"inline"} />
            </Drawer>
          
        </Layout.Header>
      </Layout>
        </Row>
      
    </nav>
  );
};


export default Navbar;
