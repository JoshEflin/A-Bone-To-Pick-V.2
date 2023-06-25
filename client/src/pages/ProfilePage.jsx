import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Button, Card } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, GET_ME } from "../utils/queries";
import styles from "./ProfilePage.module.css";
import DoggyDash from '../components/cards/DoggyDash'

export default function Profile(props) {
  const {setDogCardData, dogCardData}=props
  console.log(setDogCardData)
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
  console.log("User Data", userData?._id);
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
    refetch,
  } = useQuery(GET_ME);
  const meData = dataMe?.me;
  console.log("MeData", meData?._id);
  const imageData = userData?.profilePic;
  let defaultProfilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  if (!userData) {
    return <div>Loading...</div>; // return a loading state if userData is falsy
  }
  if (meData && userData && meData._id === userData._id) {
    return (
      <>
        <Row>
        <Col>
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
          <DoggyDash setDogCardData={setDogCardData} dogCardData={dogCardData}/>
            <div>meProfile username is {userData?.username}</div>
            <div>meProfile email is {userData?.email}</div>
          </Col>
        </Row>
      </>
    );
  } else if (userData) {
    return (
      <>
        <Row>
        <Col>
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
