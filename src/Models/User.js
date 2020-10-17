const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// USER SCHEMA
const schema = new Schema({
  username: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

// SEARCH FOR AN USER USING USERNAME AND PASSWORD
schema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Invalid login credentials');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }

  return user;
};

// AUTH TOKEN GENERATION
schema.methods.generateAuthToken = async function() {
  const user = this;

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

// PASSWORD HASH GENERATION
schema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = model('users', schema);

module.exports = User;
