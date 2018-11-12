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
    let users = await user.find({ role: 'user' });
    sendJSON(res, users);
  }
  catch {
    next;
  }
});

adminRouter.get('/donators', async (req, res, next) => {
  try {
    let users = await user.find({ role: 'donator' });
    sendJSON(res, users);
  }
  catch {
    next;
  }
});

adminRouter.get('/drivers', async (req, res, next) => {
  try {
    let users = await user.find({ role: 'driver' });
    sendJSON(res, users);
  }
  catch {
    next;
  }
});

adminRouter.get('/driver-routes/donation/:username', async (req, res, next) => {
  try {
    let donation = await rd.find({ username: req.params.username, reqOrDon: 'donation' });
    sendJSON(res, donation);
  }
  catch {
    next;
  }
})

adminRouter.get('/driver-routes/requests/:username', async (req, res, next) => {
  try {
    let request = await rd.find({ username: req.params.username, reqOrDon: 'request' });
    sendJSON(res, request);
  }
  catch {
    next;
  }
});

adminRouter.put('/users', async (req, res, next) => {
  try {
    console.log('Hi from admin users page');
  }
  catch {
    next;
  }
});

adminRouter.put('/donators', async (req, res, next) => {
  try {
    console.log('Hi from admin donators page');
  }
  catch {
    next;
  }
});

adminRouter.put('/drivers', async (req, res, next) => {
  try {
    console.log('Hi from admin drivers page');
  }
  catch {
    next;
  }
});

adminRouter.delete('/users/:id', async (req, res, next) => {
  try {
    await user.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch {
    next();
  }
});

adminRouter.delete('/donators/:id', async (req, res, next) => {
  try {
    await user.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch {
    next();
  }
});

adminRouter.delete('/drivers/:id', async (req, res, next) => {
  try {
    await user.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch {
    next();
  }
});

adminRouter.delete('/driver-routes/donation/:username/:id', async (req, res, next) => {
  try {
    await rd.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch {
    next();
  }
});

adminRouter.delete('/driver-routes/request/:username/:id', async (req, res, next) => {
  try {
    await rd.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch {
    next();
  }
});


