const { AuthenticationError } = require("apollo-server-express");
const { User, Dog } = require("../models");
const { signToken } = require("../utils/auth");
const {
  getPFToken,
  getDogByID,
  breedInfo,
  serializeCardData,
  serializeCardDataArray,
} = require("./axios");

const resolvers = {
  Query: {
    users: async () => User.find().populate(["dogCards"]),
    // finding one user by _id.   parameter might be changed to another parameter
    user: async (parent, id) => {
      console.log(id);

      return User.findOne({ _id: id._id }).populate(["dogCards"]);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate(["dogCards"]);
      }
      throw new AuthenticationError("Please log in to do this.");
    },
    allDogs: async () => Dog.find().populate(["users"]),
  },
  Mutation: {
    dogById: async (parent, { dogID, breed }) => {
      const dogCard = await serializeCardData(dogID, breed);
      console.log("resolvers line 25", dogCard);
      return dogCard;
    },
    dogByZip: async (parent, { zipCode, breed }) => {
      const dogCardArray = await serializeCardDataArray(zipCode, breed);
      console.log("dogByZip resolver\n------------------", dogCardArray);
      return dogCardArray;
    },
    addUser: async (parent, { username, email, password, profilePic }) => {
      const newUser = await User.create({
        username,
        email,
        password,
        profilePic,
      });
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with that email address.");
      }
      const passCheck = await user.isCorrectPassword(password);
      if (!passCheck) {
        throw new AuthenticationError(
          "Incorrect credentials. Please try again."
        );
      }
      const token = signToken(user);
      return { token, user };
    },
    // addDog: needs to be created.  I am not sure the how similar it will be to the query dogById.
    rescueDogtoDB: async (
      parent,
      {
        userId,
        dogId,
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
        maxWeightMale,
      },
      context
    ) => {
    
      console.log(userId);
      console.log("From addDog mutation");

      if (dogId) {
        const savableDog = await Dog.findOne({ id: dogId });
            console.log(savableDog, "line 102")
        //check to see if a dog is already in database.  If it is
        // saves dog to the user
        if (savableDog === null ||undefined) {
          const newDog = await Dog.create({
            _id,
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
            maxWeightMale,
          });
          
          const newUserDog = await User.findOneAndUpdate(
            { _id: userId },
            {
              $addToSet: {
                dogCards: newDog._id,
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
        } else {
          console.log("here");
          console.log(dogId, " dog id")
          console.log(savableDog.id, " savabledog.id")
          if (savableDog.id === dogId) {
            console.log("Dog already exists but here's a card!");
            const newUserDog = await User.findOneAndUpdate(
              { _id: userId},
              {
                $addToSet: {
                  dogCards: savableDog._id,
                },
              },
              {
                new: true,
              }
            );
            console.log(context.user)
            const updateDog = await Dog.findOneAndUpdate(
                
              { id: savableDog.id },
              {
                $addToSet: {
                  users: userId,
                },
              }
            );
            const token = signToken(newUserDog);
            return {
              token,
              dog: savableDog,
            };
            
          }
        }
      }
    },
  },
};

module.exports = resolvers;
