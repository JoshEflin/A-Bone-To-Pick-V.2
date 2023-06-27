import Auth from "../../utils/auth";
import ProfileCard from "./ProfileCard";
import { useState } from "react";
import { GET_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Row, Col } from "antd";

export default function UserDash() {
  const [userCardIndex, setUserCardIndex] = useState(-1);
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataUsers,
    refetch,
  } = useQuery(GET_USERS);

  const users = dataUsers?.users;
  if (!users) {
    return <div>...Loading</div>;
  } else {
    console.log(users);
    const userArr= users.map((userData, i) => {
      console.log(userData);
      return (
        <Col span={8}>
          <ProfileCard key={i} props={userData} />
        </Col>
      );
    });
    return(
      <Row justify="center">
      {userArr}
      </Row>
    )
  }
}
