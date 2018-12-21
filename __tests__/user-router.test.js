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
    firstName: 'user-name',
    lastName: 'lastname',
    password: 'userPassword',
    role: 'client',
  };

  let newUser = new User(userInfo);
  let testUser = await newUser.save();
  userToken = testUser.generateToken();
});

afterAll(stopDB);

// ---------------------------------------------
//        User Router Test
//----------------------------------------------
describe('User router', () => {

  //---------------------------------
  //    POST ROUTES
  //---------------------------------
  it('should post a request to a specific driver name', async () => {
    let response = await mockRequest
      .post('/request')
      .auth(userToken, { type: 'bearer' })
      .send({food: 'bread'});
    expect(response.body.food).toBe('bread');
  });

  it('should throw 404 if no route', async () => {
    let response = await mockRequest
      .get('/1234');

    expect(response.status).toBe(404);
  })
});
