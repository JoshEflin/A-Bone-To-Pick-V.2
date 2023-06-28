import React from "react";
import { Menu, Col, Button } from "antd";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { GET_DOGS_DB } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import SearchBar from "../SearchBar";

const logout = (event) => {
  event.preventDefault();
  Auth.logout();
};

const LeftMenu = ({ mode, setDogCardData, data,setCardSelectedIndex }) => {
  
  
  console.log(data, "leftMenu");

  const handleButtonClick = () => {
    // setCardSelectedIndex(-1);
    console.log(setDogCardData);
    setDogCardData(data);
  };
 const handleHomeClick = ()=> {
  console.log('home clicked')
  setDogCardData(null);

 }

  return (
    <Menu
      style={{ alignItems: "center", justifyContent: "center" }}
      className="left-menu2"
      mode={mode}
    >
      <Menu.Item key="search-api">
        <SearchBar setDogCardData={setDogCardData} />
      </Menu.Item>
      <Menu.Item  onClick = {handleHomeClick}key="Home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="search-db" onClick={handleButtonClick}>
        <Link to="/">Popular Dogs</Link>
      </Menu.Item>
      {Auth.loggedIn() ? (
        <>
        
          <Menu.Item  key="Profile">
            <Link to={`/profile/${Auth.getProfile().data._id}`}>Profile</Link>
          </Menu.Item>
          <Menu.Item key="friends">
            <Link to="/userDash">Users</Link>
          </Menu.Item>
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
