import { GET_BY_ID, GET_BY_ZIP, RESCUE_DOG_TO_DB } from "../../utils/mutations";
import Template from "./Template.jsx";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Input, Form, Button } from "antd";
import defaultDog from "../../assets/images/default-dog.png";

class DogCardClass {
  constructor(data) {
    (this.id = data.id),
      (this.name = data.name),
      (this.age = data.age),
      (this.sex = data.sex),
      (this.photo = data.photo ? data.photo : defaultDog),
      (this.breed = data.breed),
      (this.size = data.size),
      (this.trained = data.trained),
      (this.contact = data.contact),
      (this.description = data.description),
      (this.status = data.status),
      (this.energy = data.energy),
      (this.playfulness = data.playfulness),
      (this.protectiveness = data.protectiveness),
      (this.trainability = data.trainability),
      (this.barking = data.barking),
      (this.minHeightFemale = data.minHeightFemale),
      (this.maxHeightFemale = data.maxHeightFemale),
      (this.minWeightFemale = data.minWeightFemale);
    (this.maxWeightFemale = data.maxWeightFemale),
      (this.minHeightMale = data.minHeightMale),
      (this.maxHeightMale = data.maxHeightMale),
      (this.minWeightMale = data.minWeightMale),
      (this.maxWeightMale = data.maxWeightMale);
  }
}
function DogCards({ props }) {
  if (props === null) {
    return <div>hello</div>;
  } else {
    // console.log(props)
    const { dogByZip } = props;
    const dogCardArr = dogByZip.map((card, i) => {
      const dogCard = new DogCardClass(card);
      console.log(dogCard);
      return (
        <div data-id={dogCard.id} key={i} className="card">
          <div className="card-border">
            <div className="card-header">
              <span className="name">{dogCard.name}</span>
              <span className="breed">{dogCard.breed}</span>
            </div>
            <div className="card-header2">
              <span className="age">{dogCard.age}</span>
              <span className="gender">{dogCard.sex}</span>
            </div>
            <img src={dogCard.photo} alt="photo of Doggo" />
            <div className="dog-attributes">
              <span className="size">{dogCard.size}</span>
              <span className="house-trained">
                {/* ternary here */}
                <i className=" fa-solid fa-poop"></i>
              </span>
            </div>
            <div className="dog-stats">
              <div className="description">
                <span className="item">Energy:</span>
                <span className="item">Trainability:</span>
                <span className="item">Playfulness:</span>
                <span className="item">Protectiveness:</span>
                <span className="item evil">Barking</span>
              </div>
              <div className="power-level">
                <span className="item2">
                  <i className="fa-solid fa-bolt-lightning"></i>
                  <i className="fa-solid fa-bolt-lightning"></i>
                  <i className="fa-solid fa-bolt-lightning"></i>
                </span>
                <span className="item2">
                  <i className=" fa-solid fa-scale-balanced"></i>
                  <i className=" fa-solid fa-scale-balanced"></i>
                </span>
                <span className="item2">
                  <i className=" fa-solid fa-face-grin-tears"></i>
                  <i className=" fa-solid fa-face-grin-tears"></i>
                  <i className=" fa-solid fa-face-grin-tears"></i>
                </span>
                <span className="item2">
                  <i className="fa-solid fa-shield"></i>
                  <i className="fa-solid fa-shield"></i>
                  <i className="fa-solid fa-shield"></i>
                  <i className="fa-solid fa-shield"></i>
                  <i className="fa-solid fa-shield"></i>
                </span>
                <span className="item2">
                  <i className="fa-solid fa-volume-high"></i>
                  <i className="fa-solid fa-volume-high"></i>
                  <i className="fa-solid fa-volume-high"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return dogCardArr;
  }
}
export default function DoggyDash() {
  const [zipString, setZipString] = useState("");
  const [idString, setIdString] = useState("");
  const [form] = Form.useForm();
  const [breedString, setBreedString] = useState("");
  const [cardSelectedIndex, isCardSelectedIndex] = useState("-1");
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
        <DogCards props={dogCardData} />
      </section>
    </>
  );
}
