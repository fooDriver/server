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
userRouter.get('/driver-routes', (req, res, next) => {
  res.send('hello user checking out driver routes');
});

userRouter.get('/driver-routes/:name', (req, res, next) => {
  res.send('hello user checking out driver routes again');
});

userRouter.post('/driver-routes/request/:name', (req, res, next) => {
  res.send('Whuzzup user posting to driver routes');
});