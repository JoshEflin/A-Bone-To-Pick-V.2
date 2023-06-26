import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Button, Card } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, GET_ME } from "../utils/queries";
import styles from "./ProfilePage.module.css";
import DoggyDash from '../components/cards/DoggyDash'
import { Divider } from "antd";

export default function Profile(props) {
  const {setDogCardData, dogCardData}=props
  console.log(dogCardData)
  // console.log(setDogCardData)
  const navigate = useNavigate();

  const { _id } = useParams();
  console.log(_id);
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER, {
    variables: {
      id: _id,
    },
  });
  const userData = dataUser?.user;
  // console.log("User Data", userData?._id);
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
    refetch,
  } = useQuery(GET_ME);
  const meData = dataMe?.me;
  // console.log("MeData", meData?._id);
  const imageData = userData?.profilePic;
  let defaultProfilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  if (!userData) {
    return <div>Loading...</div>; // return a loading state if userData is falsy
  }
  if (meData && userData && meData._id === userData._id) {
    return (
      
        <Row >
        <Col className={styles.profileCol} span={6}>PROFILE
        <div  className="user-card">
        <div className="user-card-border">
          <div className="user-card-header">
            <span className="user-name">
              Fred
            </span>
            <span className="user-breed">
              Human
            </span>
          </div>
          <div className="user-card-header2">
            <span className="cards-owned">
              card#
            </span>
            
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
            <span className="size">
              size: fat
            </span>
            <span className="house-trained">
              <i className=" fa-solid fa-poop"></i>
            </span>
          </div>
            <div className="flex">
              <button className={styles.btnProfile}>View My Pack</button>
            <button className={styles.btnProfile}>Edit Profile</button>
            </div>
          
        </div>
      </div>
          {/* <div>
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
          </div>
            <div>meProfile username is {userData?.username}</div>
            <div>meProfile email is {userData?.email}</div>
            */}
          </Col>
          
          <Col className={styles.doggyDash}  span={18}>
          <DoggyDash setDogCardData={setDogCardData} dogCardData={dogCardData}/>
          </Col>
        </Row>
      
    );
  } else if (userData) {
    return (
      <>
        <Row>
        <Col span={8}>
          <div>
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
          </div>
          </Col>
          <Col>
            <div>someone elses username is {userData?.username}</div>
            <div>someone elses email is {userData?.email}</div>
          </Col>
        </Row>
      </>
    );
  }
}
