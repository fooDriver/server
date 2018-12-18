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

userRouter.get('/user/schema', (req,res) => {
  console.log('in user sce');
  res.json(users.jsonSchema('firstName lastName username password'));
});

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

userRouter.post('/user/driver-routes/request/:name', auth('client'), async (req, res, next) => {
  try {

    const driver = await users.findOne({
      username: req.params.name,
    });

    let request = {
      driver: driver._id,
      address: req.user.address,
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