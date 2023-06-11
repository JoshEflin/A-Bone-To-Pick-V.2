const { AuthenticationError } = require('apollo-server-express');
const { User, Dog } = require('../models');
const { signToken } = require('../utils/auth');
const { getPFToken, getDogByID, breedInfo, serializeCardData } = require('./axios')

const resolvers = {
  Query: {
    allDogs: async () => Dog.find(),
    dogById: async (parent, { dogID, breed }) => {
        const dogCard = await serializeCardData(dogID, breed)
        console.log("resolvers line 11", dogCard)
        return dogCard;
    } 
},
};

module.exports = resolvers;