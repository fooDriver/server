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
import reqDon from '../models/request-donation.js';

import sendJSON from '../middleware/sendJSON';

// routes
userRouter.get('/driver-routes', auth('user'), async (req, res, next) => {
  try {
    let drivers = await user.find({
      role: 'driver'
    });
    sendJSON(res, drivers);
  } catch (error) {
    next();
  }
});

userRouter.get('/driver-routes/:name', auth('user'), async (req, res, next) => {
  try {
    let driver = await users.findOne({
      username: req.params.name
    });
    sendJSON(res, driver);
  } catch (error) {
    next();
  }
});

userRouter.post('/driver-routes/request/:name', auth('user'), async (req, res, next) => {
  try {
    let request = {
      driver: req.params.name,
      address: req.user.address,
      food: req.body,
      reqOrDon: 'request'
    };

    let newRequest = await reqDon.create(request);
    sendJSON(res, newRequest);
  } catch (error) {
    next();
  }
});

export default userRouter;