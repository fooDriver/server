//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
const donRouter = express.Router();

// Models
import users from '../models/users';
import reqDon from '../models/request-donation';
import dRoute from '../models/driver-route.js';

// Middleware
import auth from '../middleware/auth';
import sendJSON from '../middleware/sendJSON';

// routes all the users with the role of driver and populate routes with stops
donRouter.get('/donator/driver-routes', auth('user'), async (req, res, next) => {
  try {
    const driverRoutes = await users.find({
      role: 'driver',
    });
    sendJSON(res, driverRoutes);
  }
  catch (err) {
    next();
  }
});

// single user with role of driver populate pantry with food populate routes with stops
donRouter.get('/donator/driver-routes/:name', auth('user'), async (req, res, next) => {
  try {
    const driverRoutes = await users.findOne({
      username: req.params.name,
    });
    sendJSON(res, driverRoutes);
  }
  catch (err) {
    next();
  }
});

// sends address and food of the user
donRouter.post('/donator/driver-routes/donation/:name', auth('user'), async (req, res, next) => {

  try {
    const driver = await users.findOne({
      username: req.params.name,
    });

    console.log(driver.body._id)

    let donate = {
      driver: req.params.name,
      address: req.user.address,
      food: req.body.food,
      reqOrDon: 'donation',
    };

    console.log('donate is ', donate);

    let newDonation = new reqDon(donate);
    let response = newDonation.save();
    console.log(response.body);
    sendJSON(res, newDonation);
  }
  catch (err) {
    next();
  }
});

export default donRouter;