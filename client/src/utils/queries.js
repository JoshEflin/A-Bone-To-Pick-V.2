import { gql } from "@apollo/client";

export const GET_BY_ZIP = gql `
  query DogByZip($zipCode: String, $breed: String) {
    dogByZip(zipCode: $zipCode, breed: $breed) {
      id
      name
      age
      sex
      photo
      breed
      size
      trained
      contact {
        email
        phone
        address {
          address1
          address2
        }
      }
      description
      status
      energy
      playfulness
      protectiveness
      trainability
      barking
      minHeightFemale
      maxHeightFemale
      minWeightFemale
      maxWeightFemale
      minHeightMale
      maxHeightMale
      minWeightMale
      maxWeightMale
    }
  }`;
  export const GET_BY_ID = gql `
  query DogByZip($dogId: String, $breed: String) {
    dogById(dogID: $dogId, breed: $breed) {
      id
      name
      age
      sex
      photo
      breed
      size
      trained
      contact {
        email
        phone
        address {
          address1
          address2
        }
      }
      description
      status
      energy
      playfulness
      protectiveness
      trainability
      barking
      minHeightFemale
      maxHeightFemale
      minWeightFemale
      maxWeightFemale
      minHeightMale
      maxHeightMale
      minWeightMale
      maxWeightMale
    }
  }`;