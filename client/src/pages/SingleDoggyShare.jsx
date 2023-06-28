import { React, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_DOG_BY_ID_DB } from "../utils/queries";
import { Divider, Col, Row } from "antd";
import DogCards from "../components/cards/DogCard";
import ProfileCard from "../components/cards/ProfileCard";
import styles from "./ProfilePage.module.css";

const SingleDog = () => {
  const { id } = useParams();
  const {
    loading: loadingDog,
    error: errorDog,
    data: dataDog,
  } = useQuery(GET_DOG_BY_ID_DB, {
    variables: { id },
  });
  console.log(dataDog?.dogDbById?.users[0]);

  const handleCardSelect = () => {
    console.log("hello world");
  };

  if (loadingDog) {
    // Optional: You can display a loading state here
    return <div>Loading...</div>;
  }

  if (errorDog) {
    // Optional: You can display an error message here
    return <div>Error: {errorDog.message}</div>;
  }

  return (
    <>
    <Row>
      <Col className={styles.profileCol} span={18}>
        <DogCards
          dogCardDataArray={dataDog?.dogDbById}
          fn={handleCardSelect}
          index={0}
        />
      </Col>
      <Col className={styles.doggyDash}>
        <Divider className={styles.divider} />
        <h2 className={styles.headerList}>
          These users are interested in adopting {dataDog?.dogDbById.name}
        </h2>
        {dataDog?.dogDbById?.users &&
          dataDog?.dogDbById?.users.length > 0 &&
          dataDog?.dogDbById?.users.map((user) => (
            <>
            <Col>
            <ProfileCard key={user.id} props={user} />
            </Col>
            </>
          ))}
      </Col>
      </Row>
    </>
  );
};

export default SingleDog;
