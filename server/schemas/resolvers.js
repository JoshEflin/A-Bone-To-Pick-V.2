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
    users: async () => User.find().populate(["dogCards", "friends"]),
    // finding one user by _id.   parameter might be changed to another parameter
    user: async (parent, id) => {
      console.log(id);

      return User.findOne({ _id: id._id }).populate(["dogCards", "friends"]);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate([
          "dogCards",
          "friends",
        ]);
      }
      throw new AuthenticationError("Please log in to do this.");
    },
    allDogs: async () => Dog.find().populate(["users"]),
    dogDbById: async (parent, id) => {

      return Dog.findOne({ id: id.id }).populate(["users"])
    }
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
    editUser: async (parent,  { username, profilePic }, context) => {
      if (context.user) {
        const editedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              username,
              profilePic
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return  editedUser ;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addFriend: async (parent, { friendId }, context) => {
      console.log(context.user)
      if (context.user) {
        const newFriend = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              friends: friendId,
            },
          },
          {
            new: true,
          }
        );
        return {
          newFriend,
        };
      }
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              friends: friendId,
            },
          },
          {
            new: true,
          }
        );
      }
    },
    // addDog: needs to be created.  I am not sure the how similar it will be to the query dogById.
    saveDog: async (
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
      console.log(userId, " this should be user id");
      console.log(dogId);
      console.log("From addDog mutation");

      if (dogId) {
        const savableDog = await Dog.findOne({ id: dogId });
        console.log(savableDog, "line 102");
        //check to see if a dog is already in database.  If it is
        // saves dog to the user
        if (savableDog === null || undefined) {
          const newDog = await Dog.create({
            id: dogId,
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
          const newDogUser = await Dog.findByIdAndUpdate(
            { _id: newDog._id },
            {
              $addToSet: {
                users: userId,
              },
            }
          );
          const token = signToken(newUserDog);
          return {
            token,
            dog: newDog,
          };
        } else {
          console.log("here");
          console.log(dogId, " dog id");
          console.log(savableDog.id, " savabledog.id");
          if (savableDog.id === dogId) {
            console.log("Dog already exists but here's a card!");
            const newUserDog = await User.findOneAndUpdate(
              { _id: userId },
              {
                $addToSet: {
                  dogCards: savableDog._id,
                },
              },
              {
                new: true,
              }
            );
            console.log(newUserDog);
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
    removeDog: async (parent, { dogId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              dogCards: dogId,
            },
          },
          {
            new: true,
          }
        ).populate(["dogCards", "friends"]);
      }
      throw new AuthenticationError("Please log in to do this.");
    },
  },
  

};

module.exports = resolvers;
