//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import express from 'express';
import cli from './views/cli.js';
// import router from './api/router.js';
// import notFound from './middleware/404.js'; // 404 page not found
// import serverError from './middleware/error.js'; // 500 server error

// Start Express
const app = express();

// Middleware
app.use(express.json()); // json parser
// app.use(router);
// app.use(notFound);
// app.use(serverError);

//--------------------------------------
//* Start Server
//--------------------------------------
let isRunning = false;
module.exports = {
  app, // es6 syntax

  start: (port) => {
    if(! isRunning) {
      app.listen(port, (err) => {
        if(err) { throw err; }
        isRunning = true;
        console.log('Connected to WEB server on port:', port); // TODO: remove once CLI
      });
    }
    else {
      console.log('Server is already running'); // TODO: remove once CLI installed
    }
  },

  stop: () => {
    app.close( () => {
      isRunning = false;
      console.log('Server has been stopped'); // TODO: remove once CLI installed
    });
  },
};