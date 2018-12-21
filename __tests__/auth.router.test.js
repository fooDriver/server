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
function createUser(username, firstName, lastName, password, role) {
  return User.create({ username, firstName, lastName, password, role });
}

//------------------------------
//* Testing
//------------------------------
describe('Auth signUp for users ', () => {
  it('should signup successfully', async () => {
    let user = await createUser('username', 'first', 'last', 'password', 'donator');
    expect(user.username).toBe('username');
    expect(user.firstName).toBe('first');
    expect(user.password).not.toBe('password');
  });

  it('should successfully generate and pass a token when a username and password are present', async () => {
    let response = await mockRequest.post('/signup').send({
      username: 'billyjoe',
      firstName: 'Billy',
      lastName: 'Joe',
      password: 'secretpassword',
    });
    expect(response.status).toBe(200);
    expect(typeof response.text).toBe('string'); // matches randomly generated token string
  });

  it('should return an error when a username and password are both not present', async () => {
    try {
      await createUser('Billy');
    } catch (error) {
      expect(error.message).toBe(
        'users validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., password: Path `password` is required.'
      );
    }
  });

  it('should return an error when the username is not present', async () => {
    try {
      await createUser(undefined, 'Billy', 'goat');
    } catch (error) {
      expect(error.message).toEqual(
        expect.stringContaining('username: Path `username` is required')
      );
    }
  });

  it('should return an error when the password is not present', async () => {
    try {
      await createUser('billyjoe', 'Billy', 'joe', undefined);
    } catch (error) {
      expect(error.message).toEqual(
        expect.stringContaining(
          'users validation failed: password: Path `password` is required.'
        )
      );
    }
  });
});

describe('Signin Test', () => {
  it('should test the cookie after a successful basic login', async () => {
    let nonAdmin = await createUser('joeswanson', 'Joe', 'silverbullet', 'last'); //basic user
    let response = await mockRequest
      .post('/signin')
      .auth('joeswanson', 'last');
    expect(response.status).toEqual(200);
    expect(typeof response.header['set-cookie']).toBe('object');
  });

  it('should test the cookie after a successful bearer login', async () => {
    let response = await mockRequest.post('/signup').send({
      username: 'billyjoe',
      firstName: 'Billy',
      lastName: 'Joe',
      password: 'secretpassword',
    });

    let token = response.text;
    console.log(token);
    let login = await mockRequest
      .post('/signin')
      .auth(token, { type: 'bearer' });
    expect(login.status).toBe(200);
  });

  it('should respond with a status of 401 if the login credentials are incorrect', async () => {
    let nonAdmin = await createUser('joeswanson', 'Joe', 'silverbullet', 'last'); //basic user
    let response = await mockRequest
      .post('/signin')
      .auth(nonAdmin.username, 'wrongpassword');
    expect(response.status).toEqual(401);
  });
});
