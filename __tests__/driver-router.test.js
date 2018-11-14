'use strict';

require('dotenv').config();
import supergoose, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app';
import driver from '../src/api/driver-router';
import auth from '../src/api/auth-router';
import User from '../src/models/users';

const mockRequest = supergoose(app);

//Need this line for Wallaby
process.env.SECRET = 'SECRET';

let token;
let testDriver;


beforeAll(async () => {
  await startDB();
  let info = {
    username: 'driver',
    name: 'driver',
    password: 'driver',
    role: 'driver'
  }
  let newDriver = new User(info);
  // console.log(newDriver);
  testDriver = await newDriver.save();
  token = testDriver.generateToken();

});
afterAll(stopDB);
// beforeEach(async() => {
//   await User.deleteMany({});
// });

// function createDriverUser(username, name, password,role) {
//   return User.create({ username, name, password, role});
// }

describe('Driver router', () => {
  it('should get the driver rout with the driver name', async () => {
  let response = await mockRequest.get('/driver-routes/driver').auth(token,{type:"bearer"});
  console.log(response.status);
  expect(response.status).toBe(200);
  let driver = JSON.parse(response.text);
  expect(driver.username).toBe("driver");
  expect(driver.name).toBe("driver");
  });

  it('should post driver pantry with the driver name', () => {

  });
  xit('should delete food from pantry with driver name and food id', () => { });
});