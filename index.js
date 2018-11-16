//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';
console.clear();

// Dependencies
require('dotenv').config();
require('babel-polyfill');
require('babel-register');
require('./src/app.js');

// Mongooose Setup
const mongoose = require('mongoose');
const options = {
  useNewUrlParser:true,
  useCreateIndex: true,
  useFindAndModify: false,
};

//-------------------------------------
//* Initiate Servers
//-------------------------------------
// Open Connection to DB Server
// TODO: Create logic to connect to LOCALHOST or PRODUCTION database
try {
  mongoose.connect(process.env.MONGODB_TEST_URI, options);
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`Connected to MDB server on port: ${process.env.MONGODB_TEST_URI}`);
  });  
} catch (e) {
  console.error(e);
}

// Open Connection to Web Server
// TODO: Create logic to connect to LOCALHOST or PRODUCTION database
try {
  require('./src/app.js').start(process.env.PORT);
} catch (e) {
  console.error(e);
}