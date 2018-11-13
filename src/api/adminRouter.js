import express from 'express';
const adminRouter = express.Router();

import dRoute from '../models/driver-route.js';
import food from '../models/food.js';
import pantry from '../models/pantry.js';
import stop from '../models/stops.js';
import rd from '../models/request-donation.js';
import user from '../models/users.js';
import sendJSON from '../middleware/sendJSON';
//will need to import auth once ready

adminRouter.get('/food', async (req, res, next) => {
  try {
    const foods = await food.find({});
    sendJSON(res, foods);
  }
  catch {
    next;
  }
});

adminRouter.get('/stops', async (req, res, next) => {
  try {
    const routeStops = await stop.find({});
    sendJSON(res, routeStops); 
  }
  catch {
    next;
  }
});

adminRouter.get('/driver-routes', async (req, res, next) => {
  try {
    const driverRoutes = await dRoute.find({});
    sendJSON(res, driverRoutes);
  }
  catch {
    next;
  }
});

adminRouter.get('/pantries', async (req, res, next) => {
  try {
    const pantries = await pantry.find({});
    sendJSON(res, pantries);
  }
  catch {
    next;
  }
});

adminRouter.get('/users', async (req, res, next) => {
  try {
    const users = await user.find({ role: 'user' });
    sendJSON(res, users);
  }
  catch {
    next;
  }
});

adminRouter.get('/donators', async (req, res, next) => {
  try {
    const users = await user.find({ role: 'donator' });
    sendJSON(res, users);
  }
  catch {
    next;
  }
});

adminRouter.get('/drivers', async (req, res, next) => {
  try {
    const users = await user.find({ role: 'driver' });
    sendJSON(res, users);
  }
  catch {
    next;
  }
});

adminRouter.get('/driver-routes/donation/:username', async (req, res, next) => {
  try {
    const donation = await rd.find({ username: req.params.username, reqOrDon: 'donation' });
    sendJSON(res, donation);
  }
  catch {
    next;
  }
});

adminRouter.get('/driver-routes/requests/:username', async (req, res, next) => {
  try {
    const request = await rd.find({ username: req.params.username, reqOrDon: 'request' });
    sendJSON(res, request);
  }
  catch {
    next;
  }
});

adminRouter.post('/food', async (req, res, next) => {
  try {
    let newFood = await food.create(req.body);
    sendJSON(res, newFood);
  }
  catch {
    next;
  }
});

adminRouter.post('/stops', async (req, res, next) => {
  try {
    let newStop = await stop.create(req.body);
    sendJSON(res, newStop);
  }
  catch {
    next;
  }
});

adminRouter.post('/driver-routes', async (req, res, next) => {
  try {
    const newDriverRoute = await dRoute.create(req.body);
    sendJSON(res, newDriverRoute);
  }
  catch {
    next;
  }
});

adminRouter.post('/pantries', async (req, res, next) => {
  try {
    const newPantry = await pantry.create(req.body);
    sendJSON(res, newPantry);
  }
  catch{
    next;
  }
});

adminRouter.post('/donators', async (req, res, next) => {
  try {
    let newDonator = await user.create(req.body);
    const updatedDonator = await user.update(
      { '_id': newDonator._id },
      { '$set': { 'address': req.body.address } },
    );
    sendJSON(res, updatedDonator);
  }
  catch {
    next;
  }
});

adminRouter.post('/drivers', async (req, res, next) => {
  try {
    let newDriver = await user.create(req.body);
    let updatedDriver = await user.update(
      { '_id': newDriver._id },
      { '$set': { 'pantry': req.body.pantry} },
      { '$set': { 'route': req.body.route } },
    );
    sendJSON(res, updatedDriver);
  }
  catch {
    next;
  }
});

adminRouter.delete('/food/:id', async (req, res, next) => {
  try {
    await food.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch {
    next();
  }
});

adminRouter.delete('/stops/:id', async (req, res, next) => {
  try {
    await stop.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch {
    next();
  }
});

adminRouter.delete('/driver-routes/:id', async (req, res, next) => {
  try {
    await dRoute.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch {
    next();
  }
});

adminRouter.delete('/pantries/:id', async (req, res, next) => {
  try {
    await pantry.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch {
    next();
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


