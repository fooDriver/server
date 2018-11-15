//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
const driverRouter = express.Router();

//Models
import driverRoute from '../models/driver-route';
import pantry from '../models/pantry';
import food from '../models/food';
import stops from '../models/stops';
import users from '../models/users';
import auth from '../middleware/auth.js';
import sendJSON from '../middleware/sendJSON';

// routes

driverRouter.get('/driver-routes/:name', auth('driver'), async (req, res, next) => {
  let driver = await users.findOne({username: req.params.name});
  res.send(driver);
});


driverRouter.post('/driver-routes/:name', auth('driver'), async (req, res, next) => {
  let driver = await users.findOne({username: req.params.name});
  let driverPantry = await pantry.findOne({driver: driver._id});
  driverPantry.pantryItems.push(req.body._id);
  await driverPantry.save();
  res.send(driverPantry);
});

// driverRouter.put('/driver-routes/:name', (req, res, next) => {

// });


driverRouter.delete('/driver-routes/:name/:foodid', auth('driver'), async(req, res, next) => {

  let driver = await users.findOne({username: req.params.name});
  let driverPantry = await pantry.findOne({driver: driver._id});
  const index = driverPantry.pantryItems.findIndex(food => JSON.stringify(food._id) == JSON.stringify(req.params.foodid));
  if (!index) {
    return 'Does not exist!';
  }
  driverPantry.pantryItems.splice(index,1);
  await driverPantry.save();

  res.statusCode = 204;
  res.send('That food was deleted');
});

export default driverRouter;