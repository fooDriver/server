'use strict';

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

async function adminUser() {
  let info = {
    username: 'admin',
    name: 'admin',
    password: 'admin',
  }

  let response = await mockRequest.post()
}

beforeAll(startDB);
afterAll(stopDB);
beforeEach(async () => {
  await User.deleteMany({});
});

describe('Admin router', () => {

  //---------------------------------
  //    POST ROUTES
  //---------------------------------
  it('should post food', () => {

  });

  it('should post route stops', () => {

  });

  it('should post food into pantries and assign a driver', () => {

  });

  it('should post stops into driver-routes and assign a driver', () => {

  });

  //---------------------------------
  //    GET ROUTES
  //---------------------------------
  it('should get all food', () => {

  });

  it('should get all route stops', () => {

  });

  it('should get all driver-routes', () => {

  });

  it('should get all pantries', () => {

  });

  it('should get drivers', () => {

  });

  it('should get donators', () => {

  });

  it('should get all users', () => {

  });

  it('should get requests', () => {

  });

  it('should get donations', () => {

  });

  //---------------------------------
  //    DELETE ROUTES
  //---------------------------------
  it('should delete food', () => {

  });

  it('should delete a stop', () => {

  });

  it('should delete a driver-route', () => {

  });

  it('should delete a pantry', () => {

  });

  it('should delete any user', () => {

  });

  it('should delete requests', () => {

  });

  it('should delete donations', () => {

  });
});