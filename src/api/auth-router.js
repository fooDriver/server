//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
const authRouter = express.Router();

// Models
import User from '../models/users.js';
import auth from '../middleware/auth';

//--------------------------------------
//* Auth Router
//--------------------------------------
//This route is for generic user puts a stopper for users to determine roles
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user
    .save()
    .then(user => res.send(user.generateToken()))
    .catch(next);
});

// SignIn route to grant security token to the cookie
authRouter.post('/signin', auth(), (req, res, next) => {
  res.cookie('Token', req.token);
  res.send(req.token);
});

//--------------------------------------
//* Page Router
//--------------------------------------
export default authRouter;