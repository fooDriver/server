'use strict';

require('dotenv').config();
import supergoose, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app';
import User from '../src/models/users.js';

const mockRequest = supergoose(app);

//Need this line for Wallaby
process.env.SECRET = 'SECRET';

// ---------------------------------------------
// Global Tokens
// Holds our user token and driver object
//----------------------------------------------
let userToken;
let testDriver;

// ---------------------------------------------
// Server and mock user creation
//----------------------------------------------
beforeAll(async () => {
  await startDB();

  let userInfo = {
    username: 'user-username',
    name: 'user-name',
    password: 'userPassword',
    role: 'user',
    address: '2901 3rd, Seattle',
  };

  let newUser = new User(userInfo);
  let testUser = await newUser.save();
  userToken = testUser.generateToken();

  let driverInfo = {
    username: 'driver-username',
    name: 'driver-name',
    password: 'driverPassword',
    role: 'driver',
  };

  let newDriver = new User(driverInfo);
  testDriver = await newDriver.save();
});

afterAll(stopDB);

// ---------------------------------------------
//        User Router Test
//----------------------------------------------
describe('User router', () => {

  //---------------------------------
  //    GET ROUTES
  //---------------------------------
  it('should send a list of all drivers to the user', async () => {
    let response = await mockRequest
      .get('/user/driver-routes')
      .auth(userToken, { type: 'bearer' });
    expect(response.body.length).toBe(1);
    expect(response.status).toBe(200);
  });

  it('should respond with chosen driver selected by username', async () => {
    let response = await mockRequest
      .get('/user/driver-routes/driver-username')
      .auth(userToken, { type: 'bearer' });
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(testDriver._id.toString());
  });

  //---------------------------------
  //    POST ROUTES
  //---------------------------------
  it('should post a request to a specific driver name', async () => {
    let response = await mockRequest
      .post('/user/driver-routes/request/driver-username')
      .auth(userToken, { type: 'bearer' })
      .send({food: 'bread'});
    expect(response.body.food).toBe('bread');
  });
});
