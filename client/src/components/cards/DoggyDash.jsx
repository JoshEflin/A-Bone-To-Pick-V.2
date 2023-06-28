import { GET_BY_ID, GET_BY_ZIP, RESCUE_DOG_TO_DB } from "../../utils/mutations";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Input, Form, Button, Modal, Row, Col } from "antd";
import { GET_ME } from "../../utils/queries";
import DogCards from "./DogCard";
import Auth from "../../utils/auth";
import SearchBar from "../SearchBar";
import styles from "./Modal.module.css";
import { AiFillPhone } from "react-icons/ai";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";
import serializeDogCardData from "./serializeDogCardData";

export default function DoggyDash(props) {
  const { dogCardData, setDogCardData } = props;
  const [zipString, setZipString] = useState("");
  const [idString, setIdString] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [breedString, setBreedString] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [rescueDogtoDB, { error }] = useMutation(RESCUE_DOG_TO_DB);
  const [cardSelectedIndex, setCardSelectedIndex] = useState(-1);
  const [copied, setCopied] = useState(false);

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
    setCopied(false)
  };

  const dogCardDataArray = serializeDogCardData(dogCardData);

  const handleRescueDogtoDB = async () => {
    let myDog = dogCardDataArray[cardSelectedIndex];
    console.log(meData);
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
          dogId: myDog.id,
          userId: meData.me._id,
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
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(dogCardDataArray[cardSelectedIndex]?.contact.phone)
  setCopied(true);
  }

  const isMobile = window.innerWidth <= 480;
  // console.log(dogCardData);
  // const dogPhoto = dogCardDataArray[cardSelectedIndex].photo;
  if (!dogCardDataArray) {
    return (
      <section>
        <Row justify="center">
          <DogCards
            dogCardDataArray={dogCardDataArray}
            fn={handleCardSelect}
            index={cardSelectedIndex}
          />
        </Row>
      </section>
    );
  }
  if (cardSelectedIndex === -1) {
    return (
      <section>
        <Row justify="center">
          <DogCards
            dogCardDataArray={dogCardDataArray}
            fn={handleCardSelect}
            index={cardSelectedIndex}
          />
        </Row>
      </section>
    );
  } else {
    if (Auth.loggedIn()) {
      // {console.log(cardSelectedIndex)}
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
                {dogCardDataArray && isMobile ? (<>
                  {console.log(dogCardDataArray)}
                  <img
                    className="mobileDog"
                    src={dogCardDataArray[cardSelectedIndex].photo}
                    alt="Dog Photo"
                  />
                  </>
                ) : (
                  <DogCards
                    dogCardDataArray={dogCardDataArray[cardSelectedIndex]}
                    fn={handleCardSelect}
                    index={cardSelectedIndex}
                  />
                )}
              </Col>
              <Col>
                  <AiFillPhone></AiFillPhone>
              <Col justify="center">
                {dogCardDataArray[cardSelectedIndex]?.contact.phone && (
                  <>
                  <CopyToClipboard text={dogCardDataArray[cardSelectedIndex]?.contact.phone}>
                    <span className={styles.phoneNumber} onClick={handleCopyToClipboard}>
                    <AiFillPhone />
                      {dogCardDataArray[cardSelectedIndex]?.contact.phone}
                    </span>
                  </CopyToClipboard>
                  {copied && <div>Phone number copied to your clipboard!</div>}
                  </>
                )}
                {console.log(dogCardDataArray[cardSelectedIndex])}
                <div>{dogCardDataArray[cardSelectedIndex]?.contact.phone}</div>
                {meData &&
                meData.me.dogCards.some(
                  (dog) => dog.id === dogCardDataArray[cardSelectedIndex].id
                ) ? (
                  <>
                    <div>{dogCardDataArray[cardSelectedIndex].description}</div>
                    <div>
                    <Button
                      href={`/shared/${dogCardDataArray[cardSelectedIndex].id}`}
                    >
                      See my profile!
                    </Button>
                    <Button href={dogCardDataArray[cardSelectedIndex].url}>Rescue Me!</Button>
                    </div>
                    <div>
                      <FacebookShareButton
                        url={`https://a-bone-to-pick.herokuapp.com/shared/${dogCardDataArray[cardSelectedIndex].id}`}
                        quote={"Check out this cute dog I found!"}
                        hashtag="#a-bone-to-pick"
                      >
                        <FacebookIcon size={40} round />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={`https://a-bone-to-pick.herokuapp.com/shared/${dogCardDataArray[cardSelectedIndex].id}`}
                        quote={"Check out this cute dog I found!"}
                        hashtag="#a-bone-to-pick"
                      >
                        <TwitterIcon size={40} round />
                      </TwitterShareButton>
                      <WhatsappShareButton
                        url={`https://a-bone-to-pick.herokuapp.com/shared/${dogCardDataArray[cardSelectedIndex].id}`}
                        quote={"Check out this cute dog I found!"}
                        hashtag="#a-bone-to-pick"
                      >
                        <WhatsappIcon size={40} round />
                      </WhatsappShareButton>
                      <LinkedinShareButton
                        url={`https://a-bone-to-pick.herokuapp.com/shared/${dogCardDataArray[cardSelectedIndex].id}`}
                        quote={"Check out this cute dog I found!"}
                        hashtag="#a-bone-to-pick"
                      >
                        <LinkedinIcon size={40} round />
                      </LinkedinShareButton>
                      <EmailShareButton
                        url={dogCardDataArray[cardSelectedIndex].contact.email}
                        quote={`Hi there! I am writing to get more information on a dog you have available named ${dogCardDataArray[cardSelectedIndex].name}. I have their petfinder ID listed as ${dogCardDataArray[cardSelectedIndex].id} and I found them at https://a-bone-to-pick.herokuapp.com/shared/${dogCardDataArray[cardSelectedIndex].id}. Thank you and I can't wait to meet my new friend!`}
                        hashtag="#a-bone-to-pick"
                      >
                        <EmailIcon size={40} round />
                      </EmailShareButton>
                    </div>
                  </>
                ) : (
                  <Button onClick={handleRescueDogtoDB}>Save to My Pack</Button>
                )}

                {console.log(meData)}
              </Col>
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
