const { Schema, model } = require("mongoose");

const DogSchema = new Schema({
  id: {
    type: Number, // maybe turn into a String
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  age: {
    type: String,
  },
  sex: {
    type: String,
  },
  photo: {
    type: String,
  },
  breed: {
    type: String,
  },
  size: {
    type: String,
  },
  trained: {
    type: Boolean,
  },
  contact: {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postcode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  energy: {
    type: Number,
  },
  playfulness: {
    type: Number,
  },
  protectiveness: {
    type: Number,
  },
  trainability: {
    type: Number,
  },
  barking: {
    type: Number,
  },
  minHeightFemale: {
    type: Number,
  },
  maxHeightFemale: {
    type: Number,
  },
  minWeightFemale: {
    type: Number,
  },
  maxWeightFemale: {
    type: Number,
  },
  minHeightMale: {
    type: Number,
  },
  maxHeightMale: {
    type: Number,
  },
  minWeightMale: {
    type: Number,
  },
  maxWeightMale: {
    type: Number,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Dog = model("Dog", DogSchema);

module.exports = Dog;
