const { AuthenticationError } = require('apollo-server-express');
const { User, Dog } = require('../models');
const { signToken } = require('../utils/auth');
const { getPFToken, getDogByID, breedInfo, serializeCardData, serializeCardDataArray } = require('./axios')

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
          
        },
        dogByZip: async (parent,{zipCode, breed}) => {
            const dogCardArray = await serializeCardDataArray(zipCode, breed);
            console.log("dogByZip resolver\n------------------",dogCardArray );
            return dogCardArray;
        },
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
        addDog: async (
            parent, 
            { 
                id, 
                name, 
                age, 
                sex, 
                photo, 
                breed, 
                size, 
                trained, 
                contact, 
                description, 
                status, 
                energy, 
                playfulness, 
                protectiveness, 
                trainability, 
                barking, 
                minHeightFemale, 
                maxHeightFemale, 
                minWeightFemale, 
                maxWeightFemale, 
                minHeightMale, 
                maxHeightMale, 
                minWeightMale, 
                maxWeightMale 
            },
            context
            ) => {
                if (context.user) {
                    const newDog = await Dog.create({
                        id, 
                        name, 
                        age, 
                        sex, 
                        photo, 
                        breed, 
                        size, 
                        trained, 
                        contact, 
                        description, 
                        status, 
                        energy, 
                        playfulness, 
                        protectiveness, 
                        trainability, 
                        barking, 
                        minHeightFemale, 
                        maxHeightFemale, 
                        minWeightFemale, 
                        maxWeightFemale, 
                        minHeightMale, 
                        maxHeightMale, 
                        minWeightMale, 
                        maxWeightMale 
                    });
                    const newUserDog = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        {
                            $addToSet: {
                                dogCards: newDog._id
                            },
                        },
                        {
                            new: true,
                        }
                    );
                    const token = signToken(newUserDog);
                    return {
                        token,
                        dog: newDog,
                    };
                }
            },
    }
};

module.exports = resolvers;