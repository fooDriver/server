//--------------------------------------
//* User Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//--------------------------------------------------
//* Address: Added property for users and donators
//* Pantry: Added property for drivers
//*        - Will pull from pantry schema
//* Route: Added property for drivers
//*       - Will pull from route schema
//--------------------------------------------------

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  address: String,
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'driver', 'donator', 'user'],
  },
});

const capabilities = {
  user: ['user'],
  donator: ['user'],
  driver: ['driver', 'user'],
  admin: ['admin', 'driver', 'user'],
};

//This is the save function for signup use .save method to access save functionality on the signup
userSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(error => {
      throw error;
    });
});

//This is the basic authorization statics method for comparing username and password;

userSchema.statics.authenticateBasic = function(auth) {
  let query = { username: auth.username };
  //this is mongo built in method to locate the item
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(error => error);
};

//This is the bearer authorization statics method to compare token entered in;

userSchema.statics.authenticateToken = function(token) {
  let parsedToken = jwt.verify(token, process.env.SECRET);
  let query = { _id: parsedToken.id };
  return this.findOne(query)
    .then(user => {
      return user;
    })
    .catch(error => error);
};

//This is a prototype(inherited method) that checks for the capabilities for your roles

userSchema.methods.can = function(capability) {
  return capabilities[this.role].includes(capability);
};

//This is a method that is inherited by all user object to use check for password validation

userSchema.methods.comparePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(valid => (valid ? this : null));
};

//This is a method that is inherited by all user object to generate a token for bearer verification

userSchema.methods.generateToken = function() {
  let tokenData = {
    id: this._id,
    capabilities: capabilities[this.role],
  };

  return jwt.sign(tokenData, process.env.SECRET);
};

export default mongoose.model('users', userSchema);
