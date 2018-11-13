'use strict';

import auth from '../src/middleware/auth.js';

describe('Auth Middleware', () => {
  it('throws an error if no authorization header present', () => {});
  it('returns an error when username and password are both not present', () => {});
  it('returns an error when the username is not present', () => {});
  it('returns an error when the password is not present', () => {});
  it('passes on a token when a username and password are present', (done) => {});
});