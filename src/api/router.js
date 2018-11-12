//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
const authRouter = express.Router();

// Models
import user from './models/user.js';
import auth from './middleware/auth.js';

//--------------------------------------
//* Auth Router
//--------------------------------------
// TODO: Review and update with Jen's models
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save().then((user) => res.send(user.generateToken())).catch(next);
});

// TODO: Review
authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('Token', req.token);
  res.send(req.token);
});

export default authRouter;

//--------------------------------------
//* Page Router
//--------------------------------------