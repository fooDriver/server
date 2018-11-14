//------------------------------
//* Setup
//------------------------------
'use strict';

// Dependencies
require('dotenv').config();
import supergoose, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app';
import User from '../src/models/users';

// Test Prep
process.env.SECRET = 'jest hack';
const mockRequest = supergoose(app);

beforeAll(startDB);
afterAll(stopDB);
beforeEach(async () => {
  await User.deleteMany({});
});

// Helper Functions
function createUser(username, name, password, role){
  return User.create({username, name, password, role});
}

//------------------------------
//* Testing
//------------------------------
describe('Auth signUp for users ', () => {

  it('should signup successfully', async () => {
    let user = await createUser('Billyuser', 'Billy', 'goat');
    expect(user.username).toBe('Billyuser');
    expect(user.name).toBe('Billy');
    expect(user.password).not.toBe('goat');
  });

  it('should successfully generate and pass a token when a username and password are present', async () => {
    let response = await mockRequest.post('/signup').send({username:'billyjoe', name: 'Billy', password: 'secretpassword'});
    expect(response.status).toBe(200);
    expect(typeof response.text).toBe('string'); // matches randomly generated token string
  });

  it('should successfully warn the user if they attempt to assign a role', async () => {
    let response = await mockRequest.post('/signup').send({username:'billyjoe', name: 'Billy', password: 'secretpassword', role:'admin'});
    expect(response.status).toBe(403);
    expect(response.text).toBe('Admin access only, please do not select role');
  });

  it('should throw an error if no authorization header present', async () => {
    let user = await createUser('Sillyuser', 'Silly', 'goat');
    let response = await mockRequest.post('/signup/admin').send(user);
    expect(response.status).toBe(401);
  });

  it('should return an error when a username and password are both not present', async() => {
    try{
      let user = await createUser('Billy');
    } catch(error) {
      expect(error.message).toBe('users validation failed: name: Path `name` is required., password: Path `password` is required.');
    }
  });

  it('should return an error when the username is not present', async () => {
    try{
      let user = await createUser(undefined, 'Billy', 'goat');
    } catch(error){
      expect(error.message).toEqual(expect.stringContaining('username: Path `username` is required'));
    }
  });

  it('should return an error when the password is not present', async () => {
    try{
      let user = await createUser('billyjoe', 'Billy', undefined);
    } catch(error){
      expect(error.message).toEqual(expect.stringContaining('users validation failed: password: Path `password` is required.'));
    }
  });

});

describe('Admin signUp ', () => {
  it('should be able to create a specific role for users with admin authentication', async () => {
    let admin = await createUser('timmytime', 'Tim', 'timmyrulz', 'admin');
    let response = await mockRequest.post('/signup/admin')
      .send({username:'billyjoe', name: 'Billy', password: 'secretpassword', role: 'admin'})
      .auth(admin.username, 'timmyrulz');
    expect(response.status).toEqual(200);
    expect(typeof response.text).toEqual('string');
  });

  it('should return a 401 status if a non-admin attempts to login', async () => {
    let nonAdmin = await createUser('joeswanson', 'Joe', 'silverbullet'); //basic user
    let response = await mockRequest.post('/signup/admin')
      .send({username:'billyjoe', name: 'Billy', password: 'secretpassword', role: 'admin'})
      .auth(nonAdmin.username, 'silverbullet');
    expect(response.status).toEqual(401);
  });
  
});

describe('Signin Test', () => {
  it('should test the cookie after a successful login', async () => {
    let nonAdmin = await createUser('joeswanson', 'Joe', 'silverbullet'); //basic user
    let response = await mockRequest.post('/signin')
      .auth(nonAdmin.username, 'silverbullet');
    expect(response.status).toEqual(200);
    expect(typeof response.header['set-cookie']).toBe('object');
  });

  it('should respond with a status of 401 if the login credentials are incorrect', async () => {
    let nonAdmin = await createUser('joeswanson', 'Joe', 'silverbullet'); //basic user
    let response = await mockRequest.post('/signin')
      .auth(nonAdmin.username, 'wrongpassword');
    expect(response.status).toEqual(401);
  });

});