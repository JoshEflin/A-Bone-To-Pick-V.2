import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      password
      profilePic
      dogCards {
        id
        name
        age
        sex
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
`;
export const GET_DOGS_DB = gql`
  query AllDogs {
    allDogs {
      id
      name
      age
      sex
      photo
      breed
      size
      trained
      contact {
        address {
          address1
          address2
          city
          state
          postcode
          country
        }
        email
        phone
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
      users {
        username
        profilePic
        dogCards {
          _id
        }
      }
    }
  }
`;

export const GET_DOG_BY_ID_DB = gql`
  query dogDbById($id: String!) {
    dogDbById(id: $id) {
      _id
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
      users {
        _id
        username
        email
        password
        profilePic
      }
    }
  }
`;

export const GET_USER = gql`
  query Query($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      password
      profilePic
      dogCards {
        _id
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
  }
`;
export const GET_USERS = gql`
  query Users {
    users {
      _id
      username
      email
      profilePic
      dogCards {
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
  }
`;
