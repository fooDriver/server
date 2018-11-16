//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
import authRouter from './api/auth-router.js';
import driverRouter from './api/driver-router.js';
import adminRouter from './api/adminRouter.js';
import donRouter from './api/donator-router.js';
import userRouter from './api/user-router.js';

// Start Express
const app = express();

// Middleware
app.use(express.json()); // json parser
app.use(authRouter);
app.use(adminRouter);
app.use(driverRouter);
app.use(donRouter);
app.use(userRouter);

//--------------------------------------
//* Start Server
//--------------------------------------
let server;

module.exports =  {
  app,
  start: (port) => {
    server = app.listen(port, () => console.log('Listening on port ' + port));
  },
  stop: () => {
    server.close( () => {
      console.log('Server has been stopped');
    });
  },
};
