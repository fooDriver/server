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

let token;
let testDrivers;
// let apples;
// let driverPantry;
let testUser;


beforeAll(async () => {
  await startDB();

  let userInfo = {
    username: 'user',
    name: 'user',
    password: 'user',
    role: 'user',
    address: '2901 3rd, Seattle'
  }

  let newUser = new User(userInfo);
  testUser = await newUser.save();
  // token = testUser.generateToken();

  let driverInfo = {
    username: 'driver',
    name: 'driver',
    password: 'driver',
    role: 'driver',
  }

  let newDriver = new User(driverInfo);
  testDrivers = await newDriver.save();
  // token = testDriver.generateToken();

//   let foodInfo = {
//     food: 'apples',
//   }

//   let newFood = new food(foodInfo);
//   apples = await newFood.save();

//   let pantryInfo = {
//     driver: testDrivers._id,
//     pantryItems: [],
//   }

//   let newPantry = new pantry(pantryInfo);
//   driverPantry = await newPantry.save();

// });

// afterAll(stopDB);
// // beforeEach(async() => {
// //   await User.deleteMany({});
// // });



describe('User router', () => {
  it('should send a list of all drivers to the user', async () => {
    let response = await mockRequest.get('/user/driver-routes').auth(token, { type: "bearer" });
    console.log(response);
    expect(testDrivers.length).toBe(1);
    expect(response.status).toBe(200);
  });

//   it('should get all the driver routes', () => { });
//   it('should get driver rout with driver name', () => { });
//   it('should post a request with driver name', () => { });
});
});