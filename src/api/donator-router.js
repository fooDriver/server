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
donRouter.get('/donator/driver-routes', auth('donator'), async (req, res, next) => {
  try {
    const driverRoutes = await users.find({
      role: 'driver',
    }, '-password');
    sendJSON(res, driverRoutes);
  }
  catch (err) {
    next();
  }
});

// single user with role of driver populate pantry with food populate routes with stops
donRouter.get('/donator/driver-routes/:name', auth('donator'), async (req, res, next) => {
  try {
    const driverRoutes = await users.findOne({
      username: req.params.name,
    }, '-password');
    if(!driverRoutes) {
      notFound(req, res, next);
    }
    sendJSON(res, driverRoutes);
  }
  catch (err) {
    next();
  }
});

donRouter.post('/donation', auth('donator'), async (req, res, next) => {
  try {
    let donate = {
      address: req.body.address,
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