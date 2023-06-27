// USE THIS FUNCTION TO STRIP transform dogCardData into an array instead of an object. any new queries need to be inserted as if checks as seen below!!!
const serializeDogCardData = (dogCardData) => {
  let dogCardDataArray;
  if (!dogCardData) {
    return;
  } else if ("dogByZip" in dogCardData) {
    dogCardDataArray = dogCardData.dogByZip;
  } else if ("allDogs" in dogCardData) {
    dogCardDataArray = dogCardData.allDogs;
  } else if ("profileCards" in dogCardData) {
    dogCardDataArray = dogCardData.profileCards;
  }
  return dogCardDataArray;
};

export default serializeDogCardData;
