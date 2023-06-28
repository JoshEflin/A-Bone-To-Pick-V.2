import styles from "../../pages/ProfilePage.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { ADD_FRIEND, REMOVE_FRIEND, EDIT_USER } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";

export default function ProfileCard({ props }) {
  console.log(props);
  const imageData = props?.profilePic;
  let defaultProfilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const [showForm, setShowForm] = useState(false);
  const [userFormData, setUserFormData] = useState({
    username: "",
    profilePic: "",
  });
  const [editUser, { loading, error }] = useMutation(EDIT_USER);
  const [form] = Form.useForm();
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
    refetch,
  } = useQuery(GET_ME);
  console.log(dataMe);
  const handleFollowFriend = async (event) => {
    console.log(dataMe.me);
    try {
      const { data } = await addFriend({
        variables: {
          friendId: props._id,
        },
      });
      console.log("Hello friend");
      if (!data) {
        throw new Error("You have no friends");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFriend = async (event) => {
    try {
      const { data } = await removeFriend({
        variables: {
          friendId: props._id, // Replace with the actual friend ID
        },
      });
      console.log("Friend removed:", data.removeFriend);
      refetch();
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async () => {
    // Filter out empty strings from userFormData
    // console.log(props)
    const filteredData = Object.entries(userFormData)
      .filter(([_, value]) => value !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    try {
      const { data } = await editUser({
        variables: {
          editUserId: props?._id,
          ...filteredData,
        },
      });

      console.log("Edited User:", data.editUser);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  return (
    <div className="user-card">
      <div className="user-card-border">
        <div className="user-card-header">
          <span className="user-name">{props.username}</span>
          <span className="user-breed">Human</span>
        </div>
        <div className="user-card-header2">
          <span className="cards-owned">{props.email}</span>
        </div>

        {imageData ? (
          <img
            className={styles.profilePic}
            src={imageData}
            alt="Database profile"
          />
        ) : (
          <img
            className={styles.profilePic}
            src={defaultProfilePic}
            alt="Default profile"
          />
        )}
        <div className="user-attributes">
          {/* <span className="size">
              Saved {props.dogCards.length} Cards(poorly worded)
            </span> */}
          {/* <span className="house-trained">
            <p>This human is house trained</p>
          </span> */}
        </div>
        <div className="flex">
          {dataMe &&
            (dataMe?.me.friends &&
            dataMe?.me.friends.some((friend) => friend._id === props._id) ? (
              <button
                className={styles.btnProfile}
                onClick={() => handleRemoveFriend(props._id)}
                style={{
                  display: props._id !== dataMe?.me._id ? "block" : "none",
                }}
              >
                Remove Friend
              </button>
            ) : (
              <button
                className={styles.btnProfile}
                onClick={handleFollowFriend}
                style={{
                  display: props._id !== dataMe?.me?._id ? "block" : "none",
                }}
              >
                Add Friend
              </button>
            ))}

          {props._id !== dataMe?.me?._id ? (
            <Link to={`/profile/${props._id}`}>
              <button className={styles.btnProfile}>
                View My Pack
              </button>
            </Link>
          ) : null}
          <button
            className={styles.btnProfile}
            onClick={() => setShowForm(!showForm)}
            style={{ display: props._id === dataMe?.me._id ? "block" : "none" }}
          >
            {showForm ? "Close" : "Edit Profile"}
          </button>
          {showForm && (
            <Form id="editUser-form" form={form} onFinish={handleFormSubmit}>
              <Form.Item
                name="username"
                rules={[
                  {
                    message: "Please input your new username!",
                  },
                ]}
              >
                <Input
                  name="username"
                  placeholder="Username"
                  onChange={handleInputChange}
                  value={userFormData.username}
                />
              </Form.Item>
              <Form.Item
                name="profilePic"
                rules={[
                  {
                    message: "Please input a link to your new profile pic!",
                  },
                ]}
              >
                <Input
                  placeholder="Profile Picture Link"
                  name="profilePic"
                  onChange={handleInputChange}
                  value={userFormData.profilePic}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="editUser-form-button"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
