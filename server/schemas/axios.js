require("dotenv").config();
const fs = require("fs");
const defaultDog = fs.readFileSync("../utils/default-dog.png");
const axios = require("axios");

const petFinderApiKey = process.env.PF_API_KEY;
const petFinderSecret = process.env.PF_SECRET;
const dogApiKey = process.env.DOG_API_KEY;

// TO DO create a class  for dog cards, pass API data through it to serialize dog card data
class DogCardData {
  constructor(pfData, breed) {
    this.id = pfData.id,
    this.name = pfData.name,
    this.age = pfData.age,
    this.sex = pfData.gender,
    this.photo = pfData.photo ? pfData.primary_photo_cropped.full : defaultDog,
    this.breed = pfData.breeds.primary,
    this.size = pfData.size,
    this.trained = pfData.attributes.house_trained,
    this.contact = pfData.contact,
    this.description = pfData.description,
    this.status = pfData.status,
    this.energy = breed.energy,
    this.playfulness = breed.playfulness,
    this.protectiveness = breed.protectiveness,
    this.trainability = breed.trainability,
    this.barking = breed.barking,
    this.minHeightFemale = breed.min_height_female,
    this.maxHeightFemale = breed.max_height_female,
    this.minWeightFemale = breed.min_weight_female,
    this.maxWeightFemale = breed.max_weight_female,
    this.minHeightMale = breed.min_height_male,
    this.maxHeightMale = breed.max_height_male,
    this.minWeightMale = breed.max_weight_male,
    this.maxWeightMale = breed.max_weight_male;
  }
}

async function getPFToken() {
  try {
    const response = await axios.post(
      "https://api.petfinder.com/v2/oauth2/token",
      `grant_type=client_credentials&client_id=${petFinderApiKey}&client_secret=${petFinderSecret}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const { data } = response;
    
    return data;
    // response.data has 3 properties: token_type, expires_in, and access_token
  } catch (error) {
    // Handle the error
    console.error(error);
  }
}
async function getPetsByZip(zipCode, breed) {
  const credentials = await getPFToken();
  try {
    const data = await axios.get(
      `https://api.petfinder.com/v2/animals?breed=${breed}&location=${zipCode}&sort=distance`,
      {
        headers: {
          Authorization: `${credentials.token_type} ${credentials.access_token}`,
        },
      }
    );
    const dogsArrayByZip = data.data.animals;
    
    return dogsArrayByZip;
  } catch (e) {
    console.error(e);
  }
}
async function getDogByID(ID) {
  const credentials = await getPFToken();
  try {
    const data = await axios.get(`https://api.petfinder.com/v2/animals/${ID}`, {
      headers: {
        Authorization: `${credentials.token_type} ${credentials.access_token}`,
      },
    });
    const dogByID = data.data.animal;
    
    return dogByID;
  } catch (e) {
    console.error(e);
  }
}
async function breedInfo(breed) {
  try {
    const data = await axios.get(
      `https://api.api-ninjas.com/v1/dogs?name=${breed}`,
      {
        headers: {
          "X-Api-Key": `${dogApiKey}`,
          contentType: "applications/json",
        },
      }
    );

    
    return data.data[0];
  } catch (e) {
    console.error(e);
  }
}

async function serializeCardData(dogID, breed) {
  // for single dog by ID
  const rawDogData = await getDogByID(dogID);
  const rawBreedData = await breedInfo(breed);
  const cardData = await new DogCardData(rawDogData, rawBreedData);
  console.log("SERIALIZED DATA ----------", cardData);
  return cardData;
}

serializeCardData(63952645, "poodle");
