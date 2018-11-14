'use strict';

require('dotenv').config();
import supergoose, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app';
import auth from '../src/api/auth-router';
import User from '../src/models/users';



const mockRequest = supergoose(app);

beforeAll(startDB);
afterAll(stopDB);
beforeEach(async () => {
  await User.deleteMany({});
});


function createUser(username, name, password){
  return User.create({username, name, password});
}

describe('Auth signUp for users ', () => {

  it('should signup successfully', async () => {
  let user = await createUser('Billyuser', 'Billy', 'goat');
  let response = await mockRequest.post('/signup').send (user);
  expect(response.status).toBe(200);
  expect(user.username).toBe('Billyuser');
  expect(user.name).toBe('Billy');
  expect(user.password).not.toBe('goat');
  });

  it('throws an error if no authorization header present', async () => {
    let user = await createUser('Sillyuser', 'Silly', 'goat');
    let response = await mockRequest.post('/signup/admin').send (user);
    expect(response.status).toBe(401);
  });

  it('returns an error when username and password are both not present', async() => {
    try{
  let user = await createUser('Billy');
  } catch(error) {
  expect(error.message).toBe("users validation failed: name: Path `name` is required., password: Path `password` is required.");
  }
});

  it('returns an error when the username is not present', async () => {
    try{
      let user = await createUser(undefined, 'Billy', 'goat');
    } catch(error){
      expect(error.message).toEqual(expect.stringContaining("username: Path `username` is required"));
    }
  });

  xit('returns an error when the password is not present', () => {});
  xit('passes on a token when a username and password are present', (done) => {});
});

// describe('Admin signUp ', () => {
//   xit('throw error 404 if path is not "./signup"', () => {});
// });


// describe('Auth signIn', () => {
//   xit('throw error 404 if path is not "./signup"', () => {});
// });

