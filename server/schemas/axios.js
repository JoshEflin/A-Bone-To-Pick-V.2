require("dotenv").config();
const axios = require("axios");

const petFinderApiKey = process.env.PF_API_KEY;
const petFinderSecret = process.env.PF_SECRET;
const dogApiKey = process.env.DOG_API_KEY;

// TO DO : if a user inputs an incorrect breed, still return a valid object to the front end with attributes from pfData.
class DogCardData {
  constructor(pfData, breed) {
    (this.id = pfData.id),
      (this.name = pfData.name),
      (this.age = pfData.age),
      (this.sex = pfData.gender),
      (this.photo = pfData.primary_photo_cropped
        ? pfData.primary_photo_cropped.full
        : undefined);
    (this.breed = pfData.breeds.primary),
      (this.size = pfData.size),
      (this.trained = pfData.attributes.house_trained),
      (this.contact = pfData.contact),
      (this.description = pfData.description),
      (this.status = pfData.status),
      (this.energy = breed.energy),
      (this.playfulness = breed.playfulness),
      (this.protectiveness = breed.protectiveness),
      (this.trainability = breed.trainability),
      (this.barking = breed.barking),
      (this.minHeightFemale = breed.min_height_female),
      (this.maxHeightFemale = breed.max_height_female),
      (this.minWeightFemale = breed.min_weight_female),
      (this.maxWeightFemale = breed.max_weight_female),
      (this.minHeightMale = breed.min_height_male),
      (this.maxHeightMale = breed.max_height_male),
      (this.minWeightMale = breed.max_weight_male),
      (this.maxWeightMale = breed.max_weight_male);
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
    console.log(dogsArrayByZip, " empty api call");
    return dogsArrayByZip;
  } catch (e) {
    const errorDog = {
      id: 1,
      breeds: {
        primary: "Ghost",
        secondary: null,
        mixed: true,
        unknown: false,
      },
      age: "Young",
      gender: "Male",
      size: "Medium",
      attributes: {
        spayed_neutered: true,
        house_trained: true,
        declawed: null,
        special_needs: false,
        shots_current: true,
      },
      name: " Haunt McBarksAlot",
      description:
        "Oops! It seems like a mischievous dog has taken over our API!\nDog Error 404: Haunted API We apologize for the inconvenience, but it seems that one of our resident dogs has decided to have some fun by haunting the API. Don't worry, though! Our team of expert dog whisperers is on the case and working tirelessly to restore order.",
      primary_photo_cropped: {
        full: "https://www.boredpanda.com/blog/wp-content/uploads/2018/10/44681535_10158287055296840_3012042792110129152_n-5bd3099a267ce__880.jpg",
      },
      status: "adoptable",
      contact: {
        email: "notanEmail@email.com",
        phone: "(555)  555-5555",
        address: {
          address1: "Evil Sanctuary",
          address2: "Unit 401",
          city: "THE POUND",
          state: "PA",
          postcode: "19123",
          country: "US",
        },
      },
    };

    console.log("fake dog created");
    return errorDog;
    // console.error(e);
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
    const errorDog = {
      id: 1,
      breeds: {
        primary: "Husky",
        secondary: null,
        mixed: true,
        unknown: false,
      },
      age: "Young",
      gender: "Male",
      size: "Medium",
      name: " Haunt McBarksAlot",
      attributes: {
        spayed_neutered: true,
        house_trained: true,
        declawed: null,
        special_needs: false,
        shots_current: true,
      },
      description:
        "Oops! It seems like a mischievous dog has taken over our API!\nDog Error 404: Haunted API We apologize for the inconvenience, but it seems that one of our resident dogs has decided to have some fun by haunting the API. Don't worry, though! Our team of expert dog whisperers is on the case and working tirelessly to restore order.",
      primary_photo_cropped: {
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/63952645/1/?bust=1685735496",
      },
      status: "adoptable",
      contact: {
        email: "adopt@streettails.org",
        phone: "(267) 761-9434",
        address: {
          address1: "1030 N 2nd Street",
          address2: "Unit 401",
          city: "Philadelphia",
          state: "PA",
          postcode: "19123",
          country: "US",
        },
      },
    };

    console.log("fake dog created");
    return errorDog;
    // console.error(e);
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
    const breedData = data.data[0]
      ? data.data[0]
      : {
          image_link: "",
          good_with_children: 5,
          good_with_other_dogs: 5,
          shedding: 4,
          grooming: 2,
          drooling: 1,
          coat_length: 1,
          good_with_strangers: 5,
          playfulness: 5,
          protectiveness: 1,
          trainability: 3,
          energy: 5,
          barking: 5,
          min_life_expectancy: 12,
          max_life_expectancy: 14,
          max_height_male: 23.5,
          max_height_female: 23.5,
          max_weight_male: 60,
          max_weight_female: 50,
          min_height_male: 21,
          min_height_female: 21,
          min_weight_male: 45,
          min_weight_female: 35,
          name: "DB_Dog",
        };
    console.log(data.data[0], "empty breed api");
    return breedData;
  } catch (e) {
    const breedData = {
      image_link: "",
      good_with_children: 5,
      good_with_other_dogs: 5,
      shedding: 4,
      grooming: 2,
      drooling: 1,
      coat_length: 1,
      good_with_strangers: 5,
      playfulness: 5,
      protectiveness: 1,
      trainability: 3,
      energy: 5,
      barking: 5,
      min_life_expectancy: 12,
      max_life_expectancy: 14,
      max_height_male: 23.5,
      max_height_female: 23.5,
      max_weight_male: 60,
      max_weight_female: 50,
      min_height_male: 21,
      min_height_female: 21,
      min_weight_male: 45,
      min_weight_female: 35,
      name: "DB_Dog",
    };
    console.log("fake dog breed data");
    return breedData;
  }
}

async function serializeCardData(dogID, breed) {
  // for single dog by ID
  const rawDogData = await getDogByID(dogID);
  const rawBreedData = await breedInfo(breed);
  const cardData = new DogCardData(rawDogData, rawBreedData);
  console.log("SERIALIZED DATA ----------", cardData);
  return cardData;
}

async function serializeCardDataArray(zipCode, breed) {
  const rawBreedData = await breedInfo(breed);
  const rawDogArr = await getPetsByZip(zipCode, breed);
  if (!rawDogArr[1]) {
    const errorDoggy = new DogCardData(rawDogArr, rawBreedData);
    const errorDoggyArr = [errorDoggy, errorDoggy];
    return errorDoggyArr;
  } else {
    const serializedArr = rawDogArr.map((rawDog) => {
      const dogCard = new DogCardData(rawDog, rawBreedData);
      return dogCard;
    });
    console.log(serializedArr);
    return serializedArr;
  }
}
//  getPetsByZip(19148, "husky");

// serializeCardDataArray(19148, "husky");

module.exports = {
  getPFToken,
  getDogByID,
  breedInfo,
  serializeCardData,
  serializeCardDataArray,
};
