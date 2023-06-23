import { GET_BY_ID, GET_BY_ZIP, RESCUE_DOG_TO_DB } from "../../utils/mutations";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Input, Form, Button, Modal, Row, Col } from "antd";
import { GET_ME } from "../../utils/queries";
import DogCards from "./DogCard";
import Auth from "../../utils/auth";

export default function DoggyDash() {
  const [zipString, setZipString] = useState("");
  const [idString, setIdString] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [breedString, setBreedString] = useState("");
  const [cardSelectedIndex, setCardSelectedIndex] = useState(-1);
  const [dogCardData, setDogCardData] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [rescueDogtoDB, { error }] = useMutation(RESCUE_DOG_TO_DB);
  const [DogsByZip, { error: errorZip, data: dataZip }] =
    useMutation(GET_BY_ZIP);
  const {
    loading: loadingMe,
    error: meError,
    data: meData,
    refetch: refetchMe,
  } = useQuery(GET_ME);

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
      await setDogCardData(data);
      console.log(dogCardData, " Dog-Card-Data");
    } catch (e) {
      console.error(e);
    }
  };

  const handleCardSelect = (index) => {
    setCardSelectedIndex(index);
    console.log(index);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setCardSelectedIndex(-1);
    setShowModal(false);
  };
  const handleRescueDogtoDB = async () => {
    let myDog = dogCardData.dogByZip[cardSelectedIndex];
    const contactData = {
      email: myDog.email,
      phone: myDog.phone,
      address: {
        address1: myDog.address1,
        city: myDog.city,
        state: myDog.state,
        postcode: myDog.postcode,
        country: myDog.country,
      },
    };
    try {
      const { data } = await rescueDogtoDB({
        variables: {
          addDogId: myDog.id,
          ...myDog,
          contact: contactData,
        },
      });
      if (!data) {
        throw new Error("Unable to add dog.");
      }
      console.log("You saved them");
      refetchMe();
    } catch (err) {
      console.error(err);
    }
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
          <Row justify="center">
          <DogCards
            props={dogCardData}
            fn={handleCardSelect}
            index={cardSelectedIndex}
          />
          </Row>
        </section>
      </>
    );
  } else {
    if (Auth.loggedIn()) {
      return (
        <>
          <Modal open={showModal} onCancel={handleModalClose} footer={null} width="50%">
            <Row>
              <Col>
              <DogCards
                props={dogCardData}
                fn={handleCardSelect}
                index={cardSelectedIndex}
              />
            </Col>
            <Col>
            <Button>Rescue</Button>
            {/* {console.log(dogCardData.dogByZip[cardSelectedIndex].contact)} */}
            <div>{dogCardData.dogByZip[cardSelectedIndex].contact.email}</div>
            <div>{dogCardData.dogByZip[cardSelectedIndex].contact.phone}</div>
            {meData &&
            meData.me.dogCards.some(
              (dog) => dog.id === dogCardData.dogByZip[cardSelectedIndex].id
            ) ? (
              <Button>Share me!</Button>
            ) : (
              <Button onClick={handleRescueDogtoDB}>Save to My Pack</Button>
            )}

            {console.log(meData)}
            </Col>
            </Row>
          </Modal>
        </>
      );
    } else {
      return <h2>Please Log In!</h2>;
    }
  }
}
