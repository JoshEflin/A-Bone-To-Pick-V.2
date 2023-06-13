// taken from brew buddies to get started, will change typedefs to fit bone2pick
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

  type Contact {
    email: String
    phone: String
    address: Address
  }
  type Dog {
    id: Int!
    name: String
    age: String
    sex: String
    photo: String
    breed: String
    size : String
    trained: Boolean
    contact: Contact
    description: String
    status: String
    energy: String
    playfulness: Int
    protectiveness: Int
    trainability: Int
    barking: Int
    minHeightFemale: Float
    maxHeightFemale: Float
    minWeightFemale: Float
    maxWeightFemale: Float
    minHeightMale: Float
    maxHeightMale: Float
    minWeightMale: Float
    maxWeightMale: Float
  }

  type Query {
    users: [User]
    user(username: String): User
    me: User
    allDogs: [Dog]
    dogById(dogID: String, breed: String): Dog
    dogByZip(zipCode: String, breed: String): [Dog]
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