'use strict';

require('dotenv').config();
import supergoose, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app';
import driver from '../src/api/driver-router.js';
import auth from '../src/api/auth-router.js';
import User from '../src/models/users.js';
// import food from '../src/models/food.js';
// import pantry from '../src/models/pantry.js';

const mockRequest = supergoose(app);

//Need this line for Wallaby
process.env.SECRET = 'SECRET';

let userToken;
let testDriver;
let testUser;
// let apples;
// let driverPantry;


beforeAll(async () => {
  await startDB();

  let userInfo = {
    username: 'user-username',
    name: 'user-name',
    password: 'userPassword',
    role: 'user',
    address: '2901 3rd, Seattle'
  };

  let newUser = new User(userInfo);
  testUser = await newUser.save();
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




describe('User router', () => {
  it('should send a list of all drivers to the user', async () => {
    let response = await mockRequest
      .get('/user/driver-routes')
      .auth(userToken, { type: "bearer" });
    expect(response.body.length).toBe(1);
    expect(response.status).toBe(200);
  });

  it('should respond with chosen driver selected by username', async () => {
    let response = await mockRequest
      .get('/user/driver-routes/driver-username')
      .auth(userToken, { type: "bearer" });
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(testDriver._id.toString());

  });

    it('should post a request to a specific driver name', async () => {
      let response = await mockRequest
        .post('/user/driver-routes/request/driver-username')
        .auth(userToken, { type: "bearer" })
        .send({food: 'bread'});
        expect(response.body.food).toBe('bread');
      
   });
});
