//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';

// Dependencies
import User from '../models/user.js';

//--------------------------------------
//* Auth
//--------------------------------------

//This function is here acting as the middleware to approve access to USERS
export default capability => {
  return (req, res, next) => {
    try {
      //this line is to seperate the header into the auth type and the auth string which is the token required to login
      let [authType, authString] = req.headers.authorization.split(/\s+/);

      // Switch case for the different type of authorization
      switch (authType.toLowerCase()) {
        case 'basic':
          return authBasic(authString);
        case 'bearer':
          return authBearer(authString);
        default:
          return failToAuth();
      }
    } catch (err) {
      return failToAuth();
    }
    //helper for basic authentication
    function authBasic(authString) {
      let base64Buffer = Buffer.from(authString, 'base64'); // <Buffer 01 02...>
      let bufferString = base64Buffer.toString(); // john:mysecret
      let [username, password] = bufferString.split(':'); // variables username="john" and password="mysecret"
      let auth = {
        username,
        password
      };

      return User.authenticateBasic(auth).then(user => authenticate(user));
    }
    //helper for bearer authetication
    function authBearer(authString) {
      return User.authenticateToken(authString).then(user =>
        authenticate(user)
      );
    }
    //helper to determine the user's role
    function authenticate(user) {
      if (user && (!capability || user.can(capability))) {
        req.user = user;
        req.token = user.generateToken();
        next();
      } else {
        failToAuth();
      }
    }

    //helper to fail the authorization process
    function failToAuth() {
      next({
        status: 401,
        statusMessage: 'Unauthorized',
        message: 'Invalid User ID/Password'
      });
    }
  };
};
