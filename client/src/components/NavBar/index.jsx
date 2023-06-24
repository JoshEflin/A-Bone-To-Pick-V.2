
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import Auth from '../../utils/auth'
import dogIcon from '../../assets/images/dogiconedit.png'
import SearchBar from "../SearchBar";

const { Header } = Layout;

const Navbar = (props) => {
  const {DogCardData, setDogCardData} = props

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
      <Layout>
        <Layout.Header className="header">
            <img src={dogIcon} alt="Logo" className="logo" />
          <div className="logobox">
            <h1 className="title">A Bone To Pick</h1>

          </div>
            <div className="rightMenu">
              <RightMenu mode={"horizontal"} />
            </div>
          <div className="navbar-menu">
            <div className="leftMenu">
              <LeftMenu mode={"horizontal"} />
            </div>
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            
            <Drawer
              title={"A Bone To Pick"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              open={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={"inline"} />
              <RightMenu mode={"inline"} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
      <SearchBar setDogCardData={setDogCardData}/>
    </nav>
  );
};

export default Navbar;
