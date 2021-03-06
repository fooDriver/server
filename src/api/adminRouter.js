//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Router Setup
import express from 'express';
const adminRouter = express.Router();

// Dependencies
import dRoute from '../models/driver-route.js';
import food from '../models/food.js';
import amount from '../models/quantity.js';
import pantry from '../models/pantry.js';
import stop from '../models/stops.js';
import rd from '../models/request-donation.js';
import user from '../models/users.js';
import sendJSON from '../middleware/sendJSON';
import auth from '../middleware/auth';

adminRouter.get('/admin/food', auth('admin'), async (req, res, next) => {
  try {
    const foods = await food.find({});
    sendJSON(res, foods);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/stops', async (req, res, next) => {
  try {
    const routeStops = await stop.find({});
    sendJSON(res, routeStops); 
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/admin/driver-routes', auth('admin'), async (req, res, next) => {
  try {
    const driverRoutes = await dRoute.find({});
    sendJSON(res, driverRoutes);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/pantries', async (req, res, next) => {
  try {
    const pantries = await pantry.find({});
    sendJSON(res, pantries);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/admin/users', auth('admin'), async (req, res, next) => {
  try {
    let sendUsers = await user.aggregate([{
      $group: {
        _id: '$role',
        people: {
          $push: '$$ROOT',
        },
      },
    }]);
    sendJSON(res, sendUsers);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/admin/donations', auth('admin'), async (req, res, next) => {
  try {
    const donation = await rd.find({
      reqOrDon: 'donation',
    });
    sendJSON(res, donation);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/admin/requests', auth('admin'), async (req, res, next) => {
  try {
    const request = await rd.find({
      reqOrDon: 'request',
    });
    sendJSON(res, request);
  }
  catch (err) {
    next();
  }
});

adminRouter.post('/admin/food', auth('admin'), async (req, res, next) => {
  try {
    let newFood = await food.create(req.body);
    sendJSON(res, newFood);
  }
  catch (err) {
    next();
  }
});

adminRouter.post('/admin/quantity', auth('admin'), async (req, res, next) => {
  try {
    let newAmount = await amount.create(req.body);
    sendJSON(res, newAmount);
  }
  catch (err) {
    next();
  }
});

adminRouter.post('/admin/stops', auth('admin'), async (req, res, next) => {
  try {
    let newStop = await stop.create(req.body);
    sendJSON(res, newStop);
  }
  catch (err) {
    next();
  }
});

adminRouter.post('/admin/driver-routes', auth('admin'), async (req, res, next) => {
  try {
    const newDriverRoute = await dRoute.create(req.body);
    sendJSON(res, newDriverRoute);
  }
  catch (err) {
    next();
  }
});

adminRouter.post('/admin/pantries', auth('admin'), async (req, res, next) => {
  try {
    const newPantry = await pantry.create(req.body);
    sendJSON(res, newPantry);
  }
  catch (err) {
    next();
  }
});

adminRouter.delete('/admin/food/:id', auth('admin'), async (req, res, next) => {
  try {
    await food.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch (err) {
    next();
  }
});

adminRouter.delete('/admin/stops/:id', auth('admin'), async (req, res, next) => {
  try {
    await stop.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch (err) {
    next();
  }
});

adminRouter.delete('/admin/driver-routes/:id', auth('admin'), async (req, res, next) => {
  try {
    await dRoute.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch (err) {
    next();
  }
});

adminRouter.delete('/admin/pantries/:id', auth('admin'), async (req, res, next) => {
  try {
    await pantry.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch (err) {
    next();
  }
});

adminRouter.delete('/admin/users/:id', auth('admin'), async (req, res, next) => {
  try {
    await user.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch (err) {
    next();
  }
});

adminRouter.delete('/admin/driver-routes/donation/:username/:id', auth('admin'), async (req, res, next) => {
  try {
    await rd.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch (err) {
    next();
  }
});

adminRouter.delete('/admin/driver-routes/request/:username/:id', auth('admin'), async (req, res, next) => {
  try {
    await rd.findByIdAndRemove(req.params.id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
  }
  catch (err) {
    next();
  }
});

export default adminRouter;
