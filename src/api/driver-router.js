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
import users from '../models/users';
import auth from '../middleware/auth.js';

//--------------------------------------
//* Routes
//--------------------------------------
driverRouter.get('/driver/driver-routes/:name', auth('driver'), async (req, res, next) => {
  try{
    let driver = await users.findOne({username: req.params.name});
    res.send(driver);
  }
  catch(err) {
    next();
  }
});

driverRouter.post('/driver/driver-routes/:name', auth('driver'), async (req, res, next) => {
  try{
    let driver = await users.findOne({username: req.params.name});
    let driverPantry = await pantry.findOne({driver: driver._id});
    driverPantry.pantryItems.push(req.body._id);
    await driverPantry.save();
    res.send(driverPantry);
  }
  catch (err) {
    next();
  }
});

driverRouter.delete('/driver/driver-routes/:id/:foodid', auth('driver'), async(req, res, next) => {
  try{
    let driver = await users.findById(req.params.id);
    let driverPantry = await pantry.findOne({driver: driver._id});
    const index = driverPantry.pantryItems.findIndex(food => JSON.stringify(food._id) == JSON.stringify(req.params.foodid));
    if (index === -1) {
      res.end( 'Does not exist!');
    }
    driverPantry.pantryItems.splice(index,1);
    await driverPantry.save();
  
    res.statusCode = 204;
    res.send('That food was deleted');
  }
  catch (err) {
    next();
  }
});

//--------------------------------------
//* Export
//--------------------------------------
export default driverRouter;