//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
// import router from './api/router.js';
// import notFound from './middleware/404.js'; // 404 page not found
// import serverError from './middleware/error.js'; // 500 server error
import authRouter from './api/auth-router.js';
import driverRouter from './api/driver-router.js';
import adminRouter from './api/adminRouter.js';
import donRouter from './api/donator-router.js';
import auth from './middleware/auth.js';

// Start Express
const app = express();

// Middleware
app.use(express.json()); // json parser
app.use(authRouter);
app.use(auth);
app.use(adminRouter);
app.use(driverRouter);
app.use(donRouter);

// app.use(notFound);
// app.use(serverError);

//--------------------------------------
//* Start Server
//--------------------------------------
let isRunning = false;
module.exports = {
  app, // es6 syntax

  start: port => {
    if (!isRunning) {
      app.listen(port, err => {
        if (err) {
          throw err;
        }
        isRunning = true;
        console.log('Connected to WEB server on port:', port);
      });
    } else {
      console.log('Server is already running');
    }
  },

  stop: () => {
    app.close(() => {
      isRunning = false;
      console.log('Server has been stopped');
    });
  }
};
