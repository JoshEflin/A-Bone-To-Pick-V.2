import { GET_BY_ID, GET_BY_ZIP, RESCUE_DOG_TO_DB } from "../../utils/mutations";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Input, Form, Button } from "antd";
import DogCards from "./DogCard";


export default function DoggyDash() {
  const [zipString, setZipString] = useState("");
  const [idString, setIdString] = useState("");
  const [form] = Form.useForm();
  const [breedString, setBreedString] = useState("");
  const [cardSelectedIndex, setCardSelectedIndex] = useState(-1);
  const [dogCardData, setDogCardData] = useState(null);
  const [DogsByZip, { error: errorZip, data: dataZip }] =
    useMutation(GET_BY_ZIP);

  // const [DogsById, {error:errorId, data:dataId}] = useMutation(GET_BY_ID);
  const saveDog = (data) => {
    const [saveMyDogCard, { error: errorDogCard, data: dataDogCard }] =
      useMutation(RESCUE_DOG_TO_DB, {
        variables: { ...data },
      });
  };
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
      console.log(data);
      await setDogCardData(data);
      console.log(dogCardData, " Dog-Card-Data");
    } catch (e) {
      console.error(e);
    }
  };
  const handleCardSelect = (index) => {
    setCardSelectedIndex(index);   
    console.log(index) 
  };
 if (cardSelectedIndex === -1) {
  return (
    <>
      <Form layout="vertical" form={form}>
        <Form.Item label="Enter Zip Code" name="zipSearch">
          <Input placeholder=" ZipCode" onChange={handleZipSearch} />
        </Form.Item>
        <Form.Item label="Enter Breed " name="BreedSearch">
          <Input placeholder="Breed" onChange={handleBreedSearch} />
        </Form.Item>
        {/* <h2> SEARCH ME</h2> */}
        {/* <label htmlFor="dog-search"></label>
    <input type="text" onChange={(handleZipSearch)} value = {zipString} /> */}
        {/* <label htmlFor="data"></label> */}
        <Form.Item name="submit">
          <Button type="primary" onClick={handleSearchSubmit}>
            Search{" "}
          </Button>
        </Form.Item>
        {/* <input type="text" onChange={handleBreedSearch} value = {breedString} />
    <button type = "submit" onClick={handleSearchSubmit}></button> */}
      </Form>
      <section>
      <DogCards props={dogCardData} fn={handleCardSelect} index={cardSelectedIndex} />
      </section>
    </>
  );
 } else {
  <>
  <section>
      <DogCards props={dogCardData} fn={handleCardSelect} index={cardSelectedIndex} />
      </section>
      </>
 }
  
}
