'use strict';

require('dotenv').config();

import { app } from '../src/app';
import supergoose, { startDB, stopDB } from './supergoose.js';

import User from '../src/models/users.js';
import dRoute from '../src/models/driver-route.js';
import reqDon from '../src/models/request-donation.js';

const mockRequest = supergoose(app);

// -------------------------------------------------------------------
// Global Tokens
// Holds our admin token and driver, request, and donation objects
//--------------------------------------------------------------------
let adminToken;
let driver;
let yamDonation;
let yamRequest;

// ---------------------------------------------
// Server, mock admin creation
//----------------------------------------------
beforeAll(async () => {
  await startDB();
  const adminInfo = {
    username: 'admin',
    name: 'admin',
    password: 'admin',
    role: 'admin',
  }
  let newAdmin = new User(adminInfo);
  let savedAdmin = await newAdmin.save();
  adminToken = savedAdmin.generateToken();

  const driverInfo = {
    username: 'driver',
    name: 'driver',
    password: 'driver',
    role: 'driver',
  }
  let newDriver = new User(driverInfo);
  driver = await newDriver.save();

  const donationOneInfo = {
    driver: driver._id,
    address: '123 Happy Lane',
    food: 'yams',
    reqOrDon: 'donation',
  }
  const donationTwoInfo = {
    driver: driver._id,
    address: '1600 Pennsylvania Ave',
    food: 'wig',
    reqOrDon: 'donation',
  }

  let newDonation1 = new reqDon(donationOneInfo);
  yamDonation = await newDonation1.save();
  let newDonation2 = new reqDon(donationTwoInfo);
  await newDonation2.save();

  const requestOneInfo = {
    driver: driver._id,
    address: '45 Depression Lane',
    food: 'toothpaste',
    reqOrDon: 'request',
  }
  const requestTwoInfo = {
    driver: driver._id,
    address: '45 Depession Lane',
    food: 'yams',
    reqOrDon: 'request',
  }

  let newRequest1 = new reqDon(requestOneInfo);
  await newRequest1.save()
  let newRequest2 = new reqDon(requestTwoInfo);
  yamRequest = await newRequest2.save();
});

afterAll(stopDB);
beforeEach(async () => {
  await dRoute.deleteMany({});
});

// ---------------------------------------------
//        Admin Router Test
//----------------------------------------------
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

  it('should get requests', async () => {
    let response = await mockRequest
      .get(`/admin/driver-routes/requests/${driver.username}`)
      .auth(adminToken, {type: 'bearer'})

    expect(response.body.length).toBe(2);
    expect(response.body[1].food).toBe('yams');
  });

  it('should get donations', async () => {
    let response = await mockRequest
      .get(`/admin/driver-routes/donation/${driver.username}`)
      .auth(adminToken, {type: 'bearer'})

    expect(response.body.length).toBe(2);
    expect(response.body[1].food).toBe('wig');
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
    
    // This is three due to the driver and admin we created earlier in the test
    expect(users.body.length).toBe(3);

    let response = await mockRequest
      .delete(`/admin/users/${newUser._id}`)
      .auth(adminToken, {type: 'bearer'});

    users = await mockRequest
      .get('/admin/users')
      .auth(adminToken, {type: 'bearer'});

    expect(response.status).toBe(204);
    expect(users.body.length).toBe(2);
  });

  it('should delete requests', async () => {
    // let's delete the first request for yams
    let response = await mockRequest
      .delete(`/admin/driver-routes/request/${driver.username}/${yamRequest._id}`)
      .auth(adminToken, {type: 'bearer'});

    expect(response.status).toBe(204);
  });

  it('should delete donations', async () => {
    //let's delete the yam donation
    let response = await mockRequest
      .delete(`/admin/driver-routes/donation/${driver.username}/${yamRequest._id}`)
      .auth(adminToken, {type: 'bearer'});

    expect(response.status).toBe(204);
  });
});