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

// Middleware
import auth from '../middleware/auth';
import sendJSON from '../middleware/sendJSON';
import notFound from '../middleware/404.js';

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
    if(!driverRoutes) {
      notFound(req, res, next);
    }
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

    if(!driver) {
      notFound(req, res, next);
    }

    let donate = {
      driver: driver._id,
      address: req.user.address,
      food: req.body.food,
      reqOrDon: 'donation',
    };

    let newDonation = new reqDon(donate);
    let response = await newDonation.save();
    sendJSON(res, response);
  }
  catch (err) {
    next();
  }
});

export default donRouter;