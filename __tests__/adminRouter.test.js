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
beforeEach(async () => {
  await dRoute.deleteMany({});
});

describe('Admin router', () => {

  //---------------------------------
  //    POST ROUTES
  //---------------------------------
  it('should post food', async () => {
    let response = await mockRequest
      .post('/admin/food')
      .auth(adminToken, {type: 'bearer'})
      .send({food:'hummus'});

    expect(response.body.food).toBe('hummus');
  });

  it('should post route stops', async () => {
    const routeInfo = {
      name: 'Route A',
      driver: driver._id,
    };

    let newRoute = await mockRequest
      .post('/admin/driver-routes')
      .auth(adminToken, {type: 'bearer'})
      .send(routeInfo);

    const stopInfo = {
      location: '5th and Pine',
      route: newRoute._id,
    };

    let newStop = await mockRequest
      .post('/admin/stops')
      .auth(adminToken, {type: 'bearer'})
      .send(stopInfo);

    expect(newStop.body.location).toBe(stopInfo.location);
    expect(newStop.body.route).toBe(stopInfo.route);
  });

  it('should create an empty pantry and assign a driver', async () => {
    const pantryInfo = {
      driver: driver._id,
      pantryItems: [],
    };

    let newPantry = await mockRequest
      .post('/admin/pantries')
      .auth(adminToken, {type: 'bearer'})
      .send(pantryInfo);
    
    expect(newPantry.body.driver).toBe(pantryInfo.driver._id.toString());
    expect(newPantry.body.pantryItems.length).toBe(0);
  });

  it('should post a driver-route and assign a driver', async () => {
    const routeInfo = {
      name: 'Route A',
      driver: driver._id,
    };

    let response = await mockRequest
      .post('/admin/driver-routes')
      .auth(adminToken, {type: 'bearer'})
      .send(routeInfo);

    expect(response.body.name).toBe('Route A');
    expect(response.body.driver).toBe(routeInfo.driver._id.toString());
  });

  //---------------------------------
  //    GET ROUTES
  //---------------------------------
  it('should get all food', async () => {
    await mockRequest
      .post('/admin/food')
      .auth(adminToken, {type: 'bearer'})
      .send({food:'hummus'});

    await mockRequest
      .post('/admin/food')
      .auth(adminToken, {type: 'bearer'})
      .send({food:'carrots'});

    let response = await mockRequest
      .get('/admin/food')
      .auth(adminToken, {type: 'bearer'});

    expect(response.body.length).toBe(2);
  });

  it('should get all route stops', async () => {
    const routeInfo = {
      name: 'Route A',
      driver: driver._id,
    };

    let newRoute = await mockRequest
      .post('/admin/driver-routes')
      .auth(adminToken, {type: 'bearer'})
      .send(routeInfo);

    const stopOneInfo = {
      location: '5th and Pine',
      route: newRoute._id,
    };

    const stopTwoInfo = {
      location: '4th and Broad',
      route: newRoute._id,
    };

    await mockRequest
      .post('/admin/stops')
      .auth(adminToken, {type: 'bearer'})
      .send(stopOneInfo);

    await mockRequest
      .post('/admin/stops')
      .auth(adminToken, {type: 'bearer'})
      .send(stopTwoInfo);

    let response = await mockRequest
      .get('/admin/stops')
      .auth(adminToken, {type: 'bearer'});

    expect(response.body.length).toBe(2);
  });

  it('should get all driver-routes', async () => {
    const routeInfo = {
      name: 'Route A',
      driver: driver._id,
    };

    await mockRequest
      .post('/admin/driver-routes')
      .auth(adminToken, {type: 'bearer'})
      .send(routeInfo);

    let response = await mockRequest
      .get('/admin/driver-routes')
      .auth(adminToken, {type: 'bearer'});

    expect(response.body.length).toBe(1);
  });

  it('should get all pantries', async () => {
    let response = await mockRequest
      .get('/admin/pantries')
      .auth(adminToken, {type: 'bearer'});
    
    // we created our pantry earlier in the post test so we should expect there to be 1 pantry in our test

    expect(response.body.length).toBe(1);
  });

  it('should get all users', async () => {
    let response = await mockRequest
      .get('/admin/users')
      .auth(adminToken, {type: 'bearer'});

    // since we created our driver and admin above, the body should only have two users

    expect(response.body.length).toBe(2);
  });

  xit('should get requests', async () => {

  });

  xit('should get donations', async () => {

  });

  //---------------------------------
  //    DELETE ROUTES
  //---------------------------------
  it('should delete food', async () => {
    let hummus = await mockRequest
      .post('/admin/food')
      .auth(adminToken, {type: 'bearer'})
      .send({food:'hotdogs'});

    await mockRequest
      .post('/admin/food')
      .auth(adminToken, {type: 'bearer'})
      .send({food:'chicken'});
      
    let deleted = await mockRequest
      .delete(`/admin/food/${hummus.body._id}`)
      .auth(adminToken, {type: 'bearer'});

    expect(deleted.status).toBe(204);
  });

  it('should delete a stop', async () => {
    const routeInfo = {
      name: 'Route B',
      driver: driver._id,
    };

    let newRoute = await mockRequest
      .post('/admin/driver-routes')
      .auth(adminToken, {type: 'bearer'})
      .send(routeInfo);

    const stopOneInfo = {
      location: '3rd and Pine',
      route: newRoute._id,
    };
    const stopTwoInfo = {
      location: '2nd and Broad',
      route: newRoute._id,
    };

    await mockRequest
      .post('/admin/stops')
      .auth(adminToken, {type: 'bearer'})
      .send(stopOneInfo);

    let stopTwo = await mockRequest
      .post('/admin/stops')
      .auth(adminToken, {type: 'bearer'})
      .send(stopTwoInfo);

    let response = await mockRequest
      .delete(`/admin/stops/${stopTwo.body._id}`)
      .auth(adminToken, {type: 'bearer'});

    expect(response.status).toBe(204);

    let newStops = await mockRequest
      .get('/admin/stops')
      .auth(adminToken, {type: 'bearer'});

    //NOTE: this is three instead of one from the tests earlier
    expect(newStops.body.length).toBe(3);
  });

  it('should delete a driver-route', async () => {
    const routeInfo = {
      name: 'Route A',
      driver: driver._id,
    };

    let response = await mockRequest
      .post('/admin/driver-routes')
      .auth(adminToken, {type: 'bearer'})
      .send(routeInfo);

    let deleted = await mockRequest
      .delete(`/admin/driver-routes/${response.body._id}`)
      .auth(adminToken, {type: 'bearer'});

    expect(deleted.status).toBe(204);

    let routes = await mockRequest
      .get('/admin/driver-routes')
      .auth(adminToken, {type: 'bearer'});

    expect(routes.body.length).toBe(0);
  });

  it('should delete a pantry', async () => {
    let response = await mockRequest
      .get('/admin/pantries')
      .auth(adminToken, {type: 'bearer'});
  
    // we created our pantry earlier in the post test so we should expect there to be 1 pantry in our test

    expect(response.body.length).toBe(1);

    // now let's delete it!

    let deleted = await mockRequest
      .delete(`/admin/pantries/${response.body[0]._id}`)
      .auth(adminToken, {type: 'bearer'});

    expect(deleted.status).toBe(204);

    let newRes = await mockRequest
      .get('/admin/pantries')
      .auth(adminToken, {type: 'bearer'});

    expect(newRes.body.length).toBe(0);

  });

  it('should delete any user', async () => {
    const userInfo = {
      username: 'user',
      name: 'user',
      password: 'user',
      role: 'user',
    }

    let newUser = await User.create(userInfo);
    let users = await mockRequest
      .get('/admin/users')
      .auth(adminToken, {type: 'bearer'});
    
    expect(users.body.length).toBe(1);

    let response = await mockRequest
      .delete(`/admin/users/${newUser._id}`)
      .auth(adminToken, {type: 'bearer'});

    users = await mockRequest
      .get('/admin/users')
      .auth(adminToken, {type: 'bearer'});

    expect(response.status).toBe(204);
    expect(users.body.length).toBe(0);
  });

  it('should delete requests', async () => {

  });

  it('should delete donations', async () => {

  });
});