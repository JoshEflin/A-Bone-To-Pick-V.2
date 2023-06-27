import { React, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_DOG_BY_ID_DB } from "../utils/queries";
import DogCards from "../components/cards/DogCard";
import ProfileCard from "../components/cards/ProfileCard";

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
      <DogCards
        dogCardDataArray={dataDog?.dogDbById}
        fn={handleCardSelect}
        index={0}
      />

      {dataDog?.dogDbById?.users &&
        dataDog?.dogDbById?.users.length > 0 &&
        dataDog?.dogDbById?.users.map((user) => (
          <ProfileCard key={user.id} props={user} />
        ))}
    </>
  );
};

export default SingleDog;
