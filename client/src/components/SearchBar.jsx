import { GET_BY_ID, GET_BY_ZIP, RESCUE_DOG_TO_DB } from "../utils/mutations";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Input, Form, Button } from "antd";
import {Link} from 'react-router-dom'

export default function SearchBar({ setDogCardData }, dogCardData) {
  // console.log(setDogCardData);
  const [zipString, setZipString] = useState("");
  const [idString, setIdString] = useState("");
  const [form] = Form.useForm();
  const [breedString, setBreedString] = useState("");
  const [DogsByZip, { error: errorZip, data: dataZip }] =
    useMutation(GET_BY_ZIP);

  const handleZipSearch = (event) => {
    const { name, value } = event.target;
    setZipString(value);
  };
  const handleBreedSearch = (event) => {
    const { name, value } = event.target;
    setBreedString(value);
  };
  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const searchData = {
      zipCode: zipString,
      breed: breedString,
    };
    try {
      const { data } = await DogsByZip({
        variables: { ...searchData },
      });
      await setDogCardData(data);
      console.log(dogCardData, " Dog-Card-Data");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form className="search-form" layout="horizontal" form={form}>
      <Form.Item name="submit" className="search-form-btn">
        <Button type="primary" onClick={handleSearchSubmit}>
          {/* <Link to= '/'> */} {/* turned off by Fred just to test some things on profilePage*/}
          <Link>
            Search
          </Link> 
          
        </Button>
      </Form.Item>
      <div className="input-container">
        <Form.Item className= "zip-code-search" name="zipSearch">
          <Input placeholder=" Zip Code" onChange={handleZipSearch} />
        </Form.Item>
        <Form.Item className = "breed-search" name="BreedSearch">
          <Input placeholder="Breed" onChange={handleBreedSearch} />
        </Form.Item>
      </div>
    </Form>
  );
}
