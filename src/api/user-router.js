//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Router Setup
import express from 'express';
const userRouter = express.Router();

// Dependencies
import users from '../models/users.js';
import reqDon from '../models/request-donation.js';
import sendJSON from '../middleware/sendJSON';
import auth from '../middleware/auth.js';

//--------------------------------------
//* Routes
//--------------------------------------

userRouter.get('/user/driver-routes', auth('client'), async (req, res, next) => {
  try {
    let drivers = await users.find({
      role: 'driver',
    });
    sendJSON(res, drivers);
  } catch (error) {
    next();
  }
});

userRouter.get('/user/driver-routes/:id', auth('client'), async (req, res, next) => {
  try {
    let driver = await users.findById(req.params.id);
    sendJSON(res, driver);
  } catch (error) {
    next();
  }
});

userRouter.post('/request', auth('client'), async (req, res, next) => {
  try {
    let request = {
      food: req.body.food,
      reqOrDon: 'request',
    };
    let newRequest = await reqDon.create(request);
    sendJSON(res, newRequest);
  } 
  catch (error) {
    next();
  }
});

//--------------------------------------
//* Export
//--------------------------------------
export default userRouter;