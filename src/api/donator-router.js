//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
const donRouter = express.Router();

//Models
import driverRoute from '../models/driver-route';
import pantry from '../models/pantry';
import food from '../models/food';
import stops from '../models/stops';
import users from '../models/users';


import sendJSON from '../middleware/sendJSON';



// routes

// all the users with the role of driver
// populate routes with stops
donRouter.get('/driver-routes', (req, res, next) => {
  users.find({
      role: 'driver',
    })
    .then(data => {
      sendJSON(data, res);
    })
    .catch(next);

});
// single user with role of driver
// populate pantry with food
// populate routes with stops
donRouter.get('/driver-routes/:name', (req, res, next) => {
  users.findOne({
      name: req.params.name,
    })
    .then()
    .then(data => {
      sendJSON(data, res);
    })
    .catch(next);
});
// sends address and food of the user
donRouter.post('/driver-routes/donation/:name', (req, res, next) => {

});