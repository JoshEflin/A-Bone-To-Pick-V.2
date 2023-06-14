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
