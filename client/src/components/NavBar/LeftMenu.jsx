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

const LeftMenu = ({ mode, setDogCardData, data }) => {
  console.log(data, "from popular dogs");

  const handleButtonClick = () => {
    // setCardSelectedIndex(-1);
    console.log(setDogCardData);
    setDogCardData(data);
  };

  // console.log(setDogCardData);
  return (
    <Menu
      style={{ alignItems: "center", justifyContent: "center" }}
      className="left-menu2"
      mode={mode}
    >
      <Menu.Item key="search-api">
        <SearchBar setDogCardData={setDogCardData} />
      </Menu.Item>
      <Menu.Item key="Home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="search-db" onClick={handleButtonClick}>
        <Link to="/">Popular Dogs</Link>
      </Menu.Item>
      {Auth.loggedIn() ? (
        <>
          <Menu.Item key="Profile">
            <Link to="/">Profile</Link>
          </Menu.Item>
          <Menu.Item key="friends">
            <Link to="myFriends">Friends</Link>
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
