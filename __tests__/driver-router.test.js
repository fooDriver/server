'use strict';

require('dotenv').config();
import supergoose, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app';
import User from '../src/models/users';
import food from '../src/models/food.js';
import pantry from '../src/models/pantry.js';

const mockRequest = supergoose(app);

//Need this line for Wallaby
process.env.SECRET = 'SECRET';

// -------------------------------------------------------------------
// Global Tokens
// Holds our driver token and our driver, food, and pantry objects
//--------------------------------------------------------------------
let token;
let testDriver;
let apples;
let driverPantry;

// ---------------------------------------------------
// Server, mock driver, pantry, and food creation
//----------------------------------------------------
beforeAll(async () => {
  await startDB();
  let info = {
    username: 'driver',
    name: 'driver',
    password: 'driver',
    role: 'driver'
  }
  let newDriver = new User(info);
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

// ---------------------------------------------
//        Driver Router Test
//----------------------------------------------
describe('Driver router', () => {

  //---------------------------------
  //    GET ROUTES
  //---------------------------------
  it('should get the driver route with the driver name sending the driver name ', async () => {
    let response = await mockRequest.get('/driver/driver-routes/driver').auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
    let driver = JSON.parse(response.text);
    expect(driver.username).toBe("driver");
    expect(driver.name).toBe("driver");
  });

  //---------------------------------
  //    POST ROUTES
  //---------------------------------
  it('should post driver pantry with the driver name', async () => {
    expect(driverPantry.pantryItems.length).toEqual(0);
    let response = await mockRequest.post('/driver/driver-routes/driver').auth(token, { type: "bearer" }).send(apples);
    expect(response.body.pantryItems.length).toEqual(1);
    expect(response.status).toBe(200);
  });

  //---------------------------------
  //    DELETE ROUTES
  //---------------------------------
  it('should delete food from pantry with driver name and food id', async () => {

    let deleted = await mockRequest
      .delete(`/driver/driver-routes/driver/${apples._id}`)
      .auth(token, { type: "bearer" });
    expect(deleted.status).toBe(204);
  });

  it('should return error when deleting non existing item from pantry', async () => {
    let deleted = await mockRequest.delete('/driver/driver-routes/driver/1234').auth(token, { type: "bearer" });
    expect(deleted.text).toBe('Does not exist!');
  });
});