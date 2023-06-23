import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Button, Card } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, GET_ME } from "../utils/queries";
import styles from "./ProfilePage.module.css";

export default function Profile() {
  const navigate = useNavigate();

  const   id   = useParams();
  console.log(id)
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER, {
    variables:  id ,
  });
  const userData = dataUser?.data;
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
    refetch,
  } = useQuery(GET_ME);
  const meData = dataMe;

  return (
    <>
      <Row>
        <Col>
          <div>
            {userData.username}
          </div>
          <div>
            {userData.email}
          </div>
        </Col>
      </Row>
    </>
  );
}
