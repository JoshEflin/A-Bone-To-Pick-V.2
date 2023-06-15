import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        dogCards {
          id
          name
          age
          sex
          photo
          breed
          size
          trained
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
      }
    }
  }`

export const RESCUE_DOG_TO_DB = gql`
  mutation rescueDogtoDB($addDogId: Int!, 
    $name: String, 
    $age: String, 
    $sex: String, 
    $photo: String, 
    $breed: String, 
    $size: String, 
    $trained: Boolean, 
    $contact: ContactInput, 
    $description: String, 
    $status: String, 
    $energy: Int, 
    $playfulness: Int, 
    $protectiveness: Int, 
    $trainability: Int, 
    $barking: Int, 
    $minHeightFemale: Float, 
    $maxHeightFemale: Float, 
    $minWeightFemale: Float, 
    $maxWeightFemale: Float, 
    $minHeightMale: Float, 
    $maxHeightMale: Float, 
    $minWeightMale: Float, 
    $maxWeightMale: Float) {
    addDog(id: $addDogId, 
      name: $name, 
      age: $age, 
      sex: $sex, 
      photo: $photo, 
      breed: $breed, 
      size: $size, 
      trained: $trained, 
      contact: $contact, 
      description: $description, 
      status: $status, 
      energy: $energy, 
      playfulness: $playfulness, 
      protectiveness: $protectiveness, 
      trainability: $trainability, 
      barking: $barking, 
      minHeightFemale: $minHeightFemale, 
      maxHeightFemale: $maxHeightFemale, 
      minWeightFemale: $minWeightFemale, 
      maxWeightFemale: $maxWeightFemale, 
      minHeightMale: $minHeightMale, 
      maxHeightMale: $maxHeightMale, 
      minWeightMale: $minWeightMale, 
      maxWeightMale: $maxWeightMale) {
      token
    }
  }`  
  export const GET_BY_ZIP = gql `
  mutation DogByZip($zipCode: String, $breed: String) {
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
          city: String
          state: String
          postcode: String
          country: String
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
  mutation DogByZip($dogId: String, $breed: String) {
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
          city: String
          state: String
          postcode: String
          country: String
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