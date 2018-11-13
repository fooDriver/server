'use strict';

require('dotenv').config();
import supergoose, { startDB, stopDB }from './supergoose';
import { app } from '../src/app';
import auth from '../src/api/auth-router';
import User from '../src/models/users';


const mockRequest = supergoose (app);

beforeAll(startDB);
afterAll(stopDB);

function createUser(username:'billyUser', name:'Billy', password:'goat'){
  return User.create({username, name, password});
}

describe('Auth signUp for users ', () => {
  it('throw error 404 if path is not "./signup"', () => {
    
  });
  it('throws an error if no authorization header present', () => {});
  it('returns an error when username and password are both not present', () => {});
  it('returns an error when the username is not present', () => {});
  it('returns an error when the password is not present', () => {});
  it('passes on a token when a username and password are present', (done) => {});
});

describe('Admin signUp ', () => {
  it('throw error 404 if path is not "./signup"', () => {});
});


describe('Auth signIn', () => {
  it('throw error 404 if path is not "./signup"', () => {});
});
