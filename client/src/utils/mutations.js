import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $profilePic: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      profilePic: $profilePic
    ) {
      token
      user {
        _id
        email
        password
        profilePic
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const RESCUE_DOG_TO_DB = gql`
  mutation SaveDog(
    $dogId: Int!
    $userId: ID
    $name: String
    $age: String
    $sex: String
    $photo: String
    $breed: String
    $size: String
    $trained: Boolean
    $contact: ContactInput
    $description: String
    $status: String
    $energy: Int
    $playfulness: Int
    $protectiveness: Int
    $trainability: Int
    $barking: Int
    $minHeightFemale: Float
    $maxHeightFemale: Float
    $minWeightFemale: Float
    $maxWeightFemale: Float
    $minHeightMale: Float
    $maxHeightMale: Float
    $minWeightMale: Float
    $maxWeightMale: Float
  ) {
    saveDog(
      dogId: $dogId
      userId: $userId
      name: $name
      age: $age
      sex: $sex
      photo: $photo
      breed: $breed
      size: $size
      trained: $trained
      contact: $contact
      description: $description
      status: $status
      energy: $energy
      playfulness: $playfulness
      protectiveness: $protectiveness
      trainability: $trainability
      barking: $barking
      minHeightFemale: $minHeightFemale
      maxHeightFemale: $maxHeightFemale
      minWeightFemale: $minWeightFemale
      maxWeightFemale: $maxWeightFemale
      minHeightMale: $minHeightMale
      maxHeightMale: $maxHeightMale
      minWeightMale: $minWeightMale
      maxWeightMale: $maxWeightMale
    ) {
      token
      user {
        _id
        username
        email
        password
        profilePic
        dogCards {
          id
        }
      }
    }
  }
`;
export const GET_BY_ZIP = gql`
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
          city
          state
          postcode
          country
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
  }
`;
export const GET_BY_ID = gql`
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
          city
          state
          postcode
          country
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
  }
`;
export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
    }
  }
`;
export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      _id
    }
  }
`;
