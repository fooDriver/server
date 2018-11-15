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

// Test Prep
process.env.SECRET = 'jest hack';
const mockRequest = supergoose(app);

// Test Users
let donToken;
let driver;
let finalDonator;

beforeAll(async () => {
  await startDB();
  let donator = {
    username: 'cbrown',
    name: 'Charlie Brown',
    password: 'woodstock',
    role: 'donator'
  };

  let newDonator = new User(donator);
  finalDonator = await newDonator.save();
  donToken = finalDonator.generateToken();

  let driverInfo = {
    username: 'snoopyD',
    name: 'Snoopy Dog',
    password: 'woodstock',
    role: 'driver'
  };

  // Define Driver
  let newDriver = new User(driverInfo);
  driver = await newDriver.save();
});
afterAll(stopDB);
// beforeEach(async () => {
//   await User.deleteMany({});
// });

//--------------------------------------
//* Testing
//--------------------------------------
describe('Donator router', () => {
  it('should get all drivers', async () => {
    let response = await mockRequest
      .get(`/donator/driver-routes`)
      .auth(donToken, {type:'bearer'});
    
    console.log(finalDonator);
    console.log(response.body);
    
    expect(response.status).toBe(200);
    //expect(response.text).toBe();
  });

  xit('should get a specific driver by name', async () => {
    let response = await mockRequest.get(`/donator/driver-routes/${driver.name}`).auth(donToken,{type:'bearer'});
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.text).toBe('');
  });



});