//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
require('dotenv').config();
import supergoose, {
  startDB,
  stopDB,
} from './supergoose.js';
import {
  app,
} from '../src/app';
import User from '../src/models/users';

// Test Prep
process.env.SECRET = 'jest hack';
const mockRequest = supergoose(app);

// -------------------------------------------------------------------
// Global Tokens
// Holds our driver token and our driver, food, and pantry objects
//--------------------------------------------------------------------
let donToken;
let driver;
let finalDonator;

// ---------------------------------------------------
// Server and mock donator creation
//----------------------------------------------------
beforeAll(async () => {
  await startDB();
  let donator = {
    username: 'cbrown',
    firstName: 'Charlie',
    lastName: 'Brown',
    password: 'woodstock',
    role: 'donator',
  };

  let newDonator = new User(donator);
  finalDonator = await newDonator.save();
  donToken = finalDonator.generateToken();
});
afterAll(stopDB);

//--------------------------------------
//* Testing
//--------------------------------------
describe('Donator router', () => {

  //---------------------------------
  //    POST ROUTES
  //---------------------------------
  it('should post a donation', async () => {

    let response = await mockRequest
      .post(`/donation`)
      .auth(donToken,{type:'bearer'})
      .send({
        address: '123 Happy Lane',
        food: 'tortillas'
      });
    expect(response.body.food).toBe('tortillas');
  });
});