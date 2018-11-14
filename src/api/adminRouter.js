import express from 'express';
const adminRouter = express.Router();

import dRoute from '../models/driver-route.js';
import food from '../models/food.js';
import pantry from '../models/pantry.js';
import stop from '../models/stops.js';
import rd from '../models/request-donation.js';
import user from '../models/users.js';
import sendJSON from '../middleware/sendJSON';
import auth from '../middleware/auth';

adminRouter.get('/food', auth('admin'), async (req, res, next) => {
  try {
    const foods = await food.find({});
    sendJSON(res, foods);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/stops', auth('admin'), async (req, res, next) => {
  try {
    const routeStops = await stop.find({});
    sendJSON(res, routeStops); 
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/driver-routes', auth('admin'), async (req, res, next) => {
  try {
    const driverRoutes = await dRoute.find({});
    sendJSON(res, driverRoutes);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/pantries', auth('admin'), async (req, res, next) => {
  try {
    const pantries = await pantry.find({});
    sendJSON(res, pantries);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/users', auth('admin'), async (req, res, next) => {
  try {
    const users = await user.find({ role: 'user' });
    sendJSON(res, users);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/donators', auth('admin'), async (req, res, next) => {
  try {
    const users = await user.find({ role: 'donator' });
    sendJSON(res, users);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/drivers', auth('admin'), async (req, res, next) => {
  try {
    const users = await user.find({ role: 'driver' });
    sendJSON(res, users);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/driver-routes/donation/:username', auth('admin'), async (req, res, next) => {
  try {
    const donation = await rd.find({ username: req.params.username, reqOrDon: 'donation' });
    sendJSON(res, donation);
  }
  catch (err) {
    next();
  }
});

adminRouter.get('/driver-routes/requests/:username', auth('admin'), async (req, res, next) => {
  try {
    const request = await rd.find({ username: req.params.username, reqOrDon: 'request' });
    sendJSON(res, request);
  }
  catch (err) {
    next();
  }
});

adminRouter.post('/food', auth('admin'), async (req, res, next) => {
  try {
    let newFood = await food.create(req.body);
    sendJSON(res, newFood);
  }
  catch (err) {
    next();
  }
});

adminRouter.post('/stops', auth('admin'), async (req, res, next) => {
  try {
    let newStop = await stop.create(req.body);
    sendJSON(res, newStop);
  }
  catch (err) {
    next();
  }
});

adminRouter.post('/driver-routes', auth('admin'), async (req, res, next) => {
  try {
    const newDriverRoute = await dRoute.create(req.body);
    sendJSON(res, newDriverRoute);
  }
  catch (err) {
    next();
  }
});

adminRouter.post('/pantries', auth('admin'), async (req, res, next) => {
  try {
    const newPantry = await pantry.create(req.body);
    sendJSON(res, newPantry);
  }
  catch (err) {
    next();
  }
});

adminRouter.delete('/food/:id', auth('admin'), async (req, res, next) => {
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

adminRouter.delete('/stops/:id', auth('admin'), async (req, res, next) => {
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

adminRouter.delete('/driver-routes/:id', auth('admin'), async (req, res, next) => {
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

adminRouter.delete('/pantries/:id', auth('admin'), async (req, res, next) => {
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

adminRouter.delete('/users/:id', auth('admin'), async (req, res, next) => {
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

adminRouter.delete('/donators/:id', auth('admin'), async (req, res, next) => {
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

adminRouter.delete('/drivers/:id', auth('admin'), async (req, res, next) => {
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

adminRouter.delete('/driver-routes/donation/:username/:id', auth('admin'), async (req, res, next) => {
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

adminRouter.delete('/driver-routes/request/:username/:id', auth('admin'), async (req, res, next) => {
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
