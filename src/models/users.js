//--------------------------------------
//* User Schema
//--------------------------------------

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//--------------------------------------------------
//* Address: Added property for users and donators
//* Pantry: Added property for drivers
//*        - Will pull from pantry schema
//* Route: Added property for drivers
//*       - Will pull from route schema
//--------------------------------------------------

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user', enum: ['admin', 'driver', 'donator', 'user'] },
});

const capabilities = {
  user: ['read'],
  donator: ['read'],
  driver: ['read, update, delete'],
  admin: ['create', 'read', 'update', 'delete'],
};

export default mongoose.model('users', userSchema);