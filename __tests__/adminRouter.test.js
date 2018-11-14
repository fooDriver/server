'use strict';

require('dotenv').config();
import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../src/app';
import supergoose, { startDB, stopDB } from './supergoose.js';

import User from '../src/models/users.js';
import food from '../src/models/food.js';
import stop from '../src/models/stops.js';
import pantry from '../src/models/pantry.js';
import dRoute from '../src/models/driver-route.js';
import reqDon from '../src/models/request-donation.js';

import auth from '../src/middleware/auth.js';
import notFound from '../src/middleware/404.js';
import error from '../src/middleware/error.js';
import sendJSON from '../src/middleware/sendJSON.js';

const mockRequest = supergoose(app);

let adminToken;
let driver;

beforeAll(async () => {
  await startDB();
  let adminInfo = {
    username: 'admin',
    name: 'admin',
    password: 'admin',
    role: 'admin',
  }
  let newAdmin = new User(adminInfo);
  let savedAdmin = await newAdmin.save();
  adminToken = savedAdmin.generateToken();

  let driverInfo = {
    username: 'driver',
    name: 'driver',
    password: 'driver',
    role: 'driver',
  }
  let newDriver = new User(driverInfo);
  driver = await newDriver.save();
  //driverToken = savedDriver.generateToken();
});


afterAll(stopDB);
// beforeEach(async () => {
//   await User.deleteMany({});
// });

describe('Admin router', () => {

  //---------------------------------
  //    POST ROUTES
  //---------------------------------
  it('should post food', async () => {
    let response = await mockRequest
      .post('/food')
      .auth(adminToken, {type: 'bearer'})
      .send({food:'hummus'});
    expect(response.body.food).toBe('hummus');
  });

  it('should post route stops', async () => {
    const routeInfo = {
      name: 'Route A',
      driver: driver._id,
    }

    let newRoute = await mockRequest
      .post('/driver-routes')
      .auth(adminToken, {type: 'bearer'})
      .send(routeInfo);

    const stopInfo = {
      location: '5th and Pine',
      route: newRoute._id,
    }

    let newStop = await mockRequest
      .post('/stops')
      .auth(adminToken, {type: 'bearer'})
      .send(stopInfo);

    console.log(newStop.body);
    expect(newStop.body.location).toBe(stopInfo.location);
  });

  it('should post food into pantries and assign a driver', async () => {

  });

  it('should post a driver-route and assign a driver', async () => {
    const routeInfo = {
      name: 'Route A',
      driver: driver._id,
    }

    let response = await mockRequest
      .post('/driver-routes')
      .auth(adminToken, {type: 'bearer'})
      .send(routeInfo);

    expect(response.body.name).toBe('Route A');
    expect(response.body.driver).toBe(driver._id);
  });

  //---------------------------------
  //    GET ROUTES
  //---------------------------------
  it('should get all food', async () => {

  });

  it('should get all route stops', async () => {

  });

  it('should get all driver-routes', async () => {

  });

  it('should get all pantries', async () => {

  });

  it('should get drivers', async () => {

  });

  it('should get donators', async () => {

  });

  it('should get all users', async () => {

  });

  it('should get requests', async () => {

  });

  it('should get donations', async () => {

  });

  //---------------------------------
  //    DELETE ROUTES
  //---------------------------------
  it('should delete food', async () => {

  });

  it('should delete a stop', async () => {

  });

  it('should delete a driver-route', async () => {

  });

  it('should delete a pantry', async () => {

  });

  it('should delete any user', async () => {

  });

  it('should delete requests', async () => {

  });

  it('should delete donations', async () => {

  });
});