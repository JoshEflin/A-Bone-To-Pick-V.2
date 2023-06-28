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
    
    const userArr= users.map((userData, i) => {
      return (
        <Col  >
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
