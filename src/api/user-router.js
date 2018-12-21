//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Router Setup
import express from 'express';
const userRouter = express.Router();

// Dependencies
import reqDon from '../models/request-donation.js';
import sendJSON from '../middleware/sendJSON';
import auth from '../middleware/auth.js';

//--------------------------------------
//* Routes
//--------------------------------------

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