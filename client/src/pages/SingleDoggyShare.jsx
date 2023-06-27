import { React, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_DOG_BY_ID_DB } from "../utils/queries";
import DogCards from "../components/cards/DogCard";

const SingleDog = () => {
  const { id } = useParams();
  const {
    loading: loadingDog,
    error: errorDog,
    data: dataDog,
  } = useQuery(GET_DOG_BY_ID_DB, {
    variables: { id },
  });
  console.log(dataDog.dogDbById.users)

  const handleCardSelect = () => {
    console.log("hello world");
  };

  return (
    <DogCards
      dogCardDataArray={dataDog.dogDbById}
      fn={handleCardSelect}
      index={0}
    />
    
  );
};

export default SingleDog;
