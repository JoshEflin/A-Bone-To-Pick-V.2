const { AuthenticationError } = require('apollo-server-express');
const { User, Dog } = require('../models');
const { signToken } = require('../utils/auth');
const { getPFToken, getDogByID, breedInfo, serializeCardData } = require('./axios')

const resolvers = {
    Query: {
        users: async () =>
            User.find().populate(['dogCards']),
        // finding one user by username.  Username parameter might be changed to another parameter
        user: async (parent, { username }) =>
            User.findOne({ username }).populate(['dogCards']),
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate(
                    ['dogCards']
                );
            }
            throw new AuthenticationError('Please log in to do this.');
        },
        allDogs: async () =>
            Dog.find(),
        dogById: async (parent, { dogID, breed }) => {
            const dogCard = await serializeCardData(dogID, breed)
            console.log("resolvers line 25", dogCard)
            return dogCard;
        }
    },
    Mutation: {
        addUser: async (
            parent,
            {
                username,
                email,
                password,
            }
        ) => {
            const newUser = await User.create(
                {
                    username,
                    email,
                    password,
                });
            const token = signToken(newUser);
            return { token, user: newUser };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with that email address.');
            }
            const passCheck = await user.isCorrectPassword(password);
            if (!passCheck) {
                throw new AuthenticationError(
                    'Incorrect credentials. Please try again.'
                );
            }
            const token = signToken(user);
            return { token, user };
        },
        // addDog: needs to be created.  I am not sure the how similar it will be to the query dogById.  
    }
};

module.exports = resolvers;