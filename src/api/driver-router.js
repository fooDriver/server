//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
const driverRouter = express.Router();

//Models
import pantry from '../models/pantry';
import amount from '../models/quantity.js';
import users from '../models/users';
import auth from '../middleware/auth.js';
import route from '../models/driver-route.js';
import stops from '../models/stops.js';

//--------------------------------------
//* Routes
//--------------------------------------
driverRouter.get('/driver/driver-routes/:id', auth('driver'), async (req, res, next) => {
  try{
    let itemsToSend = [];
    let driver = await users.findById(req.params.id, '-password');
    let driverPantry = await pantry.find({driver: req.params.id});
    let driverRoute = await route.find({driver: req.params.id});
    let driverStops = await stops.find({route: driverRoute[0]._id});
    itemsToSend.push(driver);
    itemsToSend.push(driverPantry[0].pantryItems);
    itemsToSend.push(driverStops);
    res.send({itemsToSend});
  }
  catch(err) {
    console.log('in error');
    next();
  }
});

driverRouter.post('/driver/quantity/:id', auth('driver'), async (req,res,next) => {
  try {
    let foundQ = await amount.findByIdAndUpdate(req.params.id, req.body);
    res.send(foundQ);
  }
  catch (err) {
    next();
  }
});

//--------------------------------------
//* Export
//--------------------------------------
export default driverRouter;