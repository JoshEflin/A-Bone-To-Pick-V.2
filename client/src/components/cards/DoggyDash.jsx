import { GET_BY_ID, GET_BY_ZIP, RESCUE_DOG_TO_DB } from "../../utils/mutations";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Input, Form, Button, Modal, Row, Col } from "antd";
import { GET_ME } from "../../utils/queries";
import DogCards from "./DogCard";
import Auth from "../../utils/auth";
import SearchBar from "../SearchBar";

export default function DoggyDash(props ) {
  const {dogCardData, setDogCardData} = props;
  console.log(dogCardData);
  console.log(setDogCardData)
  const [zipString, setZipString] = useState("");
  const [idString, setIdString] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [breedString, setBreedString] = useState("");
  const [cardSelectedIndex, setCardSelectedIndex] = useState(-1);
  // const [dogCardData, setDogCardData] = useState(null);
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
  const isMobile = window.innerWidth <= 480;
  if (cardSelectedIndex === -1) {
    return (
        
        <section>
          <Row justify="center">
            <DogCards
              props={dogCardData}
              fn={handleCardSelect}
              index={cardSelectedIndex}
            />
          </Row>
        </section>

    );
  } else {
    if (Auth.loggedIn()) {
      return (
        <>
          <Modal
            open={showModal}
            onCancel={handleModalClose}
            footer={null}
            width="75%"
            style={{ maxWidth: "100%" }}
          >
            <Row>
              <Col>
                {isMobile ? (
                  <DogCards
                    props={dogCardData}
                    fn={handleCardSelect}
                    index={cardSelectedIndex}
                  />
                ) : (
                  <img
                    href={dogCardData.dogByZip[cardSelectedIndex].photo}
                  ></img>
                )}
              </Col>
              <img
                href={dogCardData.dogByZip[cardSelectedIndex].photo}
                src="Dog Photo"
              ></img>
              <Col>
                <Button>Rescue</Button>
                {/* {console.log(dogCardData.dogByZip[cardSelectedIndex].contact)} */}
                <div>
                  {dogCardData.dogByZip[cardSelectedIndex].contact.email}
                </div>
                <div>
                  {dogCardData.dogByZip[cardSelectedIndex].contact.phone}
                </div>
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
