const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address.'],
        },
        password: {
            type: String,
            required: true,
            min: [8, 'must be at least 8 characters'],
            max: [25, 'must be less than 25 characters'],
        },
        dogCards: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Dog',
            },
        ],
        //dogCards is currently referring to a Dog's information, not necessarily the card of a Dog
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });
  
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  

const User = model('User', userSchema);

module.exports = User;