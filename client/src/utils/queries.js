import { gql } from "@apollo/client";

export const GET_ME = gql`
query Me {
    me {
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
`