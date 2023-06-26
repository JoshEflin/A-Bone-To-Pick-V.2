import { useState } from "react";
import defaultDog from "../../assets/images/default-dog.png";
import drawnLogo from "../../assets/images/homepagelogo.png"
import { Col } from "antd";
import {Link} from 'react-router-dom'

class DogCardClass {
  constructor(data) {
    (this._id = data._id),
    (this.dogId = data.id),
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

function EnergyIcon({ num }) {
  // console.log(num)
  let value;
  if (num === 0) {
    return <i className="fa-solid fa-bolt-lightning"></i>;
  } else {
    const icons = [];
    for (let i = 0; i < num; i++) {
      icons.push(<i className="fa-solid fa-bolt-lightning" key={i}></i>);
    }
    value = icons;
  }
  return value;
}
function TrainabilityIcon({ num }) {
  // console.log(num, " Trainability");
  let value;
  if (num === 0) {
    return <i className=" fa-solid fa-scale-balanced"></i>;
  } else {
    const icons = [];
    for (let i = 0; i < num; i++) {
      icons.push(<i className="fa-solid fa-scale-balanced" key={i}></i>);
    }
    value = icons;
  }
  return value;
}

function PlayIcon({ num }) {
  // console.log(num, "Playfulness");
  let value;
  if (num === 0) {
    return <i className="fa-solid fa-face-grin-tears"></i>;
  } else {
    const icons = [];
    for (let i = 0; i < num; i++) {
      icons.push(<i className="fa-solid fa-face-grin-tears" key={i}></i>);
    }
    value = icons;
  }
  return value;
}

function ProtectIcon({ num }) {
  // console.log(num, "Protectiveness");
  let value;
  if (num === 0) {
    return <i className="fa-solid fa-shield"></i>;
  } else {
    const icons = [];
    for (let i = 0; i < num; i++) {
      icons.push(<i className="fa-solid fa-shield" key={i}></i>);
    }
    value = icons;
  }
  return value;
}

export default function DogCards({ props, fn, index }) {
  console.log(props);
  console.log(fn);
  console.log(index);
  if (!props) {
    return (
    // <div classname='empty-doggy-dash'>
    //   <p className="welcome-message">Welcome to the Doggy Dashboard!</p>
    //   <div>
    //     A Bone To Pick is  the perfect dog adoption website. It let's you search your area for dogs in need of a new home
    //   </div>
    //   <Link to='/login'>
    //   <img  id = "old-logo" src={drawnLogo} alt="a poorly drawn image of a dog" />
    //   </Link>
    //   <div>
    //   Just enter a Zip Code and Breed into the search bar above to start your journey. Can you collect them all?
    //   </div>
    // </div>
    <div>Emptyness</div>
    );
    
  } else if (index !== -1) {
     if(props.hasOwnProperty("dogByZip")){
      const { dogByZip } = props;
    } else {dogByZip = props}
    const dogCard = new DogCardClass(props.dogByZip[index]);
    // console.log(dogCard)
    return (
      <Col>
        <div className="card">
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
                  <EnergyIcon num={dogCard.energy} />
                </span>

                <span className="item2">
                  <TrainabilityIcon num={dogCard.trainability} />
                </span>
                <span className="item2">
                  <PlayIcon num={dogCard.playfulness} />
                </span>
                <span className="item2">
                  <ProtectIcon num={dogCard.protectiveness} />
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
      </Col>
    );
  } else {
    // console.log(props)
    if(props.hasOwnProperty("dogByZip")){
      const { dogByZip } = props;
    } else {dogByZip = props}
    // const dogArr = dogByZip? dogByZip : props;
    const dogCardArr = dogByZip.map((card, i) => {
      const dogCard = new DogCardClass(card);
      // console.log(dogCard);
      return (
        <div key={i} className="card" onClick={() => fn(i)}>
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
                  <EnergyIcon num={dogCard.energy} />
                </span>

                <span className="item2">
                  <TrainabilityIcon num={dogCard.trainability} />
                </span>
                <span className="item2">
                  <PlayIcon num={dogCard.playfulness} />
                </span>
                <span className="item2">
                  <ProtectIcon num={dogCard.protectiveness} />
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
