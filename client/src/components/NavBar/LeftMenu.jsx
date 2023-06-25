import React from "react";
import { Menu, Col } from "antd";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
const logout = (event) => {
  event.preventDefault();
  Auth.logout();
};

const LeftMenu = ({ mode, setDogCardData }) => {
  // console.log(setDogCardData);
  return (
    <Menu  className = "left-menu2" mode={mode}>
      <Menu.Item key="search-api">
        <SearchBar setDogCardData={setDogCardData} />
      </Menu.Item>
      <Menu.Item key="Home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="search-db">Find Doggos</Menu.Item>
      {Auth.loggedIn() ? (
        <>
          <Menu.Item key="Profile">
            <Link to="/"></Link>
          </Menu.Item>
          {/* browse doggyy database */}
          <Menu.Item key="Logout">
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="Login">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="Signup">
            <Link to="signup">Signup</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default LeftMenu;
