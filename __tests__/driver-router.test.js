'use strict';

require('dotenv').config();
import supergoose, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app';
import driver from '../src/api/driver-router';
import auth from '../src/api/auth-router';
import User from '../src/models/users';
import food from '../src/models/food.js';
import pantry from '../src/models/pantry.js';

const mockRequest = supergoose(app);

//Need this line for Wallaby
process.env.SECRET = 'SECRET';

let token;
let testDriver;
let apples;
let driverPantry;


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

  let foodInfo = {
    food: 'apples',
  }

  let newFood = new food(foodInfo);
  apples = await newFood.save();

  let pantryInfo = {
    driver: testDriver._id,
    pantryItems: [],
  }

  let newPantry = new pantry(pantryInfo);
  driverPantry = await newPantry.save();

  
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
  expect(response.status).toBe(200);
  let driver = JSON.parse(response.text);
  expect(driver.username).toBe("driver");
  expect(driver.name).toBe("driver");
  });

  it('should post driver pantry with the driver name', async () => {
    expect(driverPantry.pantryItems.length).toEqual(0);
    let response = await mockRequest.post('/driver-routes/driver').auth(token,{type:"bearer"}).send(apples);
    expect(response.body.pantryItems.length).toEqual(1);
    expect(response.status).toBe(200);
  });

  it('should delete food from pantry with driver name and food id', async () => {
    expect(driverPantry.pantryItems.length).toEqual(0);

    let response = await mockRequest.post('/driver-routes/driver/driver')
    .auth(token,{type:"bearer"}).send(apples); 

    expect(driverPantry.pantryItems.length).toEqual(1);

    apples;
    let deleted = await mockRequest.delete('/driver-routes/driver/apples._id').auth(token,{type:"bearer"});
    // expect(driverPantry.pantryItems.length).tpEqual(0);
});
});