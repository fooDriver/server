'use strict';

require('dotenv').config();
import supergoose, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app';
import User from '../src/models/users';
import food from '../src/models/food.js';
import pantry from '../src/models/pantry.js';
import itemAmount from '../src/models/quantity.js';
import route from '../src/models/driver-route.js';
import stops from '../src/models/stops.js';

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
let amount;
let driverRoute;
let routeStops;

// ---------------------------------------------------
// Server, mock driver, pantry, and food creation
//----------------------------------------------------
beforeAll(async () => {
  await startDB();
  let info = {
    username: 'driverdan',
    firstName: 'dan',
    lastName: 'pickles',
    password: 'password',
    role: 'driver',
  };
  let newDriver = new User(info);
  testDriver = await newDriver.save();
  token = testDriver.generateToken();

  let foodInfo = {
    food: 'apples',
  };

  let newFood = new food(foodInfo);
  apples = await newFood.save();

  let appleAmount = {
    quantity: 5,
    food: apples._id,
  }

  let newAmount = new itemAmount(appleAmount);
  amount = await newAmount.save();

  let pantryInfo = {
    driver: testDriver._id,
    pantryItems: [amount._id],
  };

  let newPantry = new pantry(pantryInfo);
  driverPantry = await newPantry.save();

  let routeInfo = {
    name: 'Route A',
    driver: testDriver._id,
  }

  let newRoute = new route(routeInfo);
  driverRoute = await newRoute.save();

  let stopsInfo = {
    route: driverRoute._id,
    location: '1st and Broad',
  }

  let newStop = new stops(stopsInfo);
  routeStops = await newStop.save();
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
    let response = await mockRequest
      .get(`/driver/driver-routes/${testDriver._id}`)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
  });

  //---------------------------------
  //    POST ROUTES
  //---------------------------------
  it('should change quantity of foods', async () => {
    let response = await mockRequest
      .post(`/driver/quantity/${amount._id}`)
      .auth(token, { type: 'bearer' })
      .send({
        quantity: 6,
        food: apples._id,
      });

    expect(response.status).toBe(200);
  });
});