// taken from brew buddies to get started, will change typedefs to fit bone2pick

// input AddressInput and input ContactInput are needed in the mutation of dog info in general because
// (according to chatgpt: In summary, the Contact type represents the output representation of contact information,
// while the ContactInput input type represents the input representation for creating or updating contact information.)
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    profilePic: String
    dogCards: [Dog]
    friends: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Address {
    address1: String
    address2: String
    city: String
    state: String
    postcode: String
    country: String
  }

  input AddressInput {
    address1: String
    address2: String
    city: String
    state: String
    postcode: String
    country: String
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
    energy: Int
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
    users: [User]
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    me: User
    allDogs: [Dog]
  }

  type Mutation {
    dogById(dogID: String, breed: String): Dog
    dogByZip(zipCode: String, breed: String): [Dog]
    addUser(
      username: String!
      email: String!
      password: String!
      profilePic: String
    ): Auth
    login(email: String!, password: String!): Auth

    saveDog(
      userId: ID
      dogId: Int!
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
      energy: Int
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
    ): Auth
  }
`;

module.exports = typeDefs;
