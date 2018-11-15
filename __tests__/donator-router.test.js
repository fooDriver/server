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
import donRep from '../src/models/request-donation.js';

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
    role: 'donator',
    address: '123 Happy Lane',
  };

  let newDonator = new User(donator);
  finalDonator = await newDonator.save();
  donToken = finalDonator.generateToken();

  let driverInfo = {
    username: 'snoopyD',
    name: 'Snoopy Dog',
    password: 'woodstock',
    role: 'driver',
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
    
    // since we already created a driver before all, we should expect 1 in the response body
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should get a specific driver by name', async () => {
    let response = await mockRequest
      .get(`/donator/driver-routes/${driver.username}`)
      .auth(donToken,{type:'bearer'});

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(driver._id.toString());
  });

  it('should post a donation', async () => {

    let response = await mockRequest
      .post(`/donator/driver-routes/donation/${driver.username}`)
      .auth(donToken,{type:'bearer'})
      .send({food: 'tortillas'});
    expect(response.body.driver).toBe(driver._id.toString());
  })

});