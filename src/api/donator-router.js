//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
const donRouter = express.Router();

// Models
import reqDon from '../models/request-donation';

// Middleware
import auth from '../middleware/auth';
import sendJSON from '../middleware/sendJSON';

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