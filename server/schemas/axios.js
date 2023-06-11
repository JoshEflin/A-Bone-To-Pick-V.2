require("dotenv").config();
const axios = require("axios");

const petFinderApiKey = process.env.PF_API_KEY;
const petFinderSecret = process.env.PF_SECRET;
const dogApiKey = process.env.DOG_API_KEY;

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
    console.log(response.data);
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
    console.log(dogsArrayByZip);
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
    console.log(dogByID);
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
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}
breedInfo("husky");
