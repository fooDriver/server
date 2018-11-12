//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
const authRouter = express.Router();

// Models
import user from '../models/user';
import auth from '../middleware/auth';

//middleware JSON sending module
import sendJSON from '../middleware/sendJSON';

//--------------------------------------
//* Auth Router
//--------------------------------------
// TODO: Review and update with Jen's models
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save().then((user) => res.send(user.generateToken())).catch(next);
});

// TODO: Review
authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('Token', req.token);
  res.send(req.token);
});



//--------------------------------------
//* Page Router
//--------------------------------------

// User routes

authRouter.get('/driver-routes', (req, res, next) => {
  res.send('hello user checking out driver routes');
});

authRouter.get('/driver-routes/:name', (req, res, next) => {
  res.send('hello user checking out driver routes again');
});

authRouter.post('/driver-routes/request/:name', (req, res, next) => {
  res.send('Whuzzup user posting to driver routes');
});


// Drivers routes
authRouter.get('/driver-routes/:name', (req, res, next) => {

});

authRouter.post('/driver-routes/:name', (req, res, next) => {

});

authRouter.put('/driver-routes/:name', (req, res, next) => {

});

authRouter.delete('/driver-routes/:name', (req, res, next) => {

});

authRouter.get('/pickup-locations/:name', (req, res, next) => {

});

// Donators routes
authRouter.get('/driver-routes', (req, res, next) => {

});

authRouter.get('/driver-routes/:name', (req, res, next) => {

});

authRouter.post('/driver-routes/donation/:name', (req, res, next) => {

});


export default authRouter;