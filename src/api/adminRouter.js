import express from 'express';
const adminRouter = express.Router();

import dRoute from '../models/driver-route.js';
import food from '../models/food.js';
import pantry from '../models/pantry.js';
import stop from '../models/stops.js';
import rd from '../models/request-donation.js';
import user from '../models/users.js';
//will need to import auth once ready

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

adminRouter.get('/users', async (req, res, next) => {
  try {
    let users = await user.find({role: 'user'});
    sendJSON(res, users);
  }
  catch {
    next;
  }
});

adminRouter.get('/donators', async (req, res, next) => {
  try {
    let users = await user.find({role: 'donator'});
    sendJSON(res, users);
  }
  catch {
    next;
  }
});

adminRouter.get('/drivers', async (req, res, next) => {
  try {
    let users = await user.find({role: 'driver'});
    sendJSON(res, users);
  }
  catch {
    next;
  }
});

// TODO: Figure out what goes here

// adminRouter.get('/pickup-locations/:username', async (req, res, next) => {
//   try {
//     let pickup = await user.find({username: req.params.username});
    
//   }
//   catch {

//   }
// })

adminRouter.get('/driver-routes/donation/:username', async (req, res, next) => {
  try {
    let donation = await rd.find({username: req.params.username, reqOrDon: 'donation'});
    sendJSON(res, donation);
  }
  catch {
    next;
  }
})

adminRouter.get('/driver-routes/requests/:username', async (req, res, next) => {
  try {
    let request = await rd.find({username: req.params.username, reqOrDon: 'request'});
    sendJSON(res, request);
  }
  catch {
    next;
  }
});

adminRouter.put('/users', async (req, res, next) => {
  
})

