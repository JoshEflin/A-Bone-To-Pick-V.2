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
    _id: ID
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

  
`;

module.exports = typeDefs;