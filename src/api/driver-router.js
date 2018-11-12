//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
const driverRouter = express.Router();

//Models
import driverRoute from '../models/driver-route';
import pantry from '../models/pantry';
import food from '../models/food';
import stops from '../models/stops';
import users from '../models/users';



import sendJSON from '../middleware/sendJSON';


// routes
driverRouter.get('/driver-routes/:name', (req, res, next) => {

});

driverRouter.post('/driver-routes/:name', (req, res, next) => {

});

driverRouter.put('/driver-routes/:name', (req, res, next) => {

});

driverRouter.delete('/driver-routes/:name', (req, res, next) => {

});