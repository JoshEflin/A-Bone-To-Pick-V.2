// taken from brew buddies to get started, will change typedefs to fit bone2pick

// input AddressInput and input ContactInput are needed in the mutation of dog info in general because 
// (according to chatgpt: In summary, the Contact type represents the output representation of contact information, 
// while the ContactInput input type represents the input representation for creating or updating contact information.)
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    dogCards: [Dog]
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Address {
    address1: String
    address2: String
  }

  input AddressInput {
    address1: String
    address2: String
  }

  input ContactInput {
    email: String
    phone: String
    address: AddressInput
  }

  type Contact {
    email: String
    phone: String
    address: Address
  }

  type Dog {
    _id: ID
    id: Int!
    name: String
    age: String
    sex: String
    photo: String
    breed: String
    size: String
    trained: Boolean
    contact: Contact
    description: String
    status: String
    energy: String
    playfulness: Int
    protectiveness: Int
    trainability: Int
    barking: Int
    minHeightFemale: Int
    maxHeightFemale: Int
    minWeightFemale: Int
    maxWeightFemale: Int
    minHeightMale: Int
    maxHeightMale: Int
    minWeightMale: Int
    maxWeightMale: Int
  }

  type Query {
    users: [User]
    user(username: String): User
    me: User
    allDogs: [Dog]
    dogById(dogID: String, breed: String): Dog
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
    ): Auth
    login(
      email: String!
      password: String!
    ): Auth
    addDog(
      _id: ID
      id: Int!
      name: String
      age: String
      sex: String
      photo: String
      breed: String
      size: String
      trained: Boolean
      contact: ContactInput
      description: String
      status: String
      energy: String
      playfulness: Int
      protectiveness: Int
      trainability: Int
      barking: Int
      minHeightFemale: Int
      maxHeightFemale: Int
      minWeightFemale: Int
      maxWeightFemale: Int
      minHeightMale: Int
      maxHeightMale: Int
      minWeightMale: Int
      maxWeightMale: Int
    ): Auth
  }
`;

module.exports = typeDefs;


