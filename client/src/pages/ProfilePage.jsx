import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Button, Card } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, GET_ME } from "../utils/queries";
import styles from "./ProfilePage.module.css";

export default function Profile() {
  const navigate = useNavigate();

  const { username } = useParams();
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER, {
    variables: { username },
  });
  const userData = dataUser?.user;
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
    refetch,
  } = useQuery(GET_ME);
  const meData = dataMe;
//   const imageData = userData?.profilePic;
//   let profilePic =
//     "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
//   if (!userData) {
//     return <div>Loading...</div>; // return a loading state if userData is falsy
//   }

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
                src={profilePic}
                alt="Default profile"
              />
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}
