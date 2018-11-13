//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
const userRouter = express.Router();

import driverRoute from '../models/driver-route';
import pantry from '../models/pantry';
import food from '../models/food';
import stops from '../models/stops';
import users from '../models/users';



import sendJSON from '../middleware/sendJSON';


// routes
userRouter.get('/driver-routes', async (req, res, next) => {
  try {
    let users = await user.find({ role: 'driver' });
    sendJSON(res, users);
  }
  catch {
    next;
  }
});

userRouter.get('/driver-routes/:name', async (req, res, next) => {
  try {
    let driver = await users.findOne({username: req.params.name});
    sendJSON(res, driver);
  }
  catch {
    next;
  }
});

userRouter.post('/driver-routes/request/:name', (req, res, next) => {
  res.send('Whuzzup user posting to driver routes');
});