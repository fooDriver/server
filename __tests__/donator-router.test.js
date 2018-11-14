//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
require('dotenv').config();
import supergoose, {
  startDB,
  stopDB
} from './supergoose.js';
import {
  app
} from '../src/app';
import User from '../src/models/users';
import donator from '../src/api/donator-router';
import auth from '../src/middleware/auth';

// Test Prep
process.env.SECRET = 'jest hack';
const mockRequest = supergoose(app);

let donToken;
let driver;

beforeAll(async () => {
  await startDB();
  let donator = {
    username: 'Charlie',
    name: 'Brown',
    password: 'woodstock',
    role: 'donator'
  };
  let newDonator = await User.create(donator);
  donToken = newDonator.generateToken();

  let driverInfo = {
    username: 'SnoopyD',
    name: 'Snoopy',
    password: 'woodstock',
    role: 'driver',
  };

});
afterAll(stopDB);
beforeEach(async () => {
  await User.deleteMany({});
});

// Define Driver
let newDriver = new User(driverInfo);
driver = await newDriver.save();

//--------------------------------------
//* Testing
//--------------------------------------
describe('Donator router', () => {
  it('should get the drivers', async () => {
    let response = await mockRequest.get(`/driver-routes/${driverInfo.name}`).auth(donToken);
    console.log('donToken', donToken);
    expect().toBe();
  });

});