# FooDriver

FooDriver is a comprehensive digital pantry application for mobile grocery stores and food pantries serving the needs of people with low mobility or limited access to nutritious food. With FooDriver organizations administering mobile food pantries will have an overview of their fleet of mobile pantries, food items stored in the pantry, the drivers and the stops on the route. Drivers or people working on the mobile pantry can keep track of inventory and restock items depending on the demand along the route. Organizations or individuals donating food items will be able to add to the inventory of the mobile pantries. With FooDriver we intend to streamline the operations of mobile grocery units and bring involved parties closer together in the process.

[![place holder](https://aimeos.org/fileadmin/user_upload/typo3-demo.jpg)](http://typo3.demo.aimeos.org/)

## Table of content
- [Application Architecture](#Application-Architecture)
- [Installation](#installation)
- [User Instructions](#User-Instructions)
- [Dependencies](#Dependencies)
- [License](#license)
- [Links](#links)


## Application Architecture
Node.js, Express, MongoDB

FooDriver is a digital pantry application that uses Javascript-related technologies and frameworks. It uses a MongoDB database to store (food) items, and uses Node.js and Express server architecture. The FooDriver application has a Command Line Interface(CLI) with which you can run commands to REGISTER an account and LOGIN as an *admin/ donator/ driver* and *user*. Moreover, you can add items to a digital pantry or take inventory through the CLI. 


## Roles supported by the FooDriver application

- **Admin** will have full CRUD access and be able to view/review/approve/reject items submitted to the queue by submitter and update the pantry list with the items that have been previously approved and added to the data base.
- **Donator** will be able to view and submit-to-post items to the digital pantry.
- **Driver** will be able to take inventory(get) of the pantry, add (post) items to and remove(delete) from the pantry. The driver role could be the driver itself or somebody working on the mobile food pantry.
- **User** will be able to retrieve (get) information about a pantry and its driver. In addition *users* can post a request to the driver role to stock up on a particular item.


## Installation
<!-- How to install the app  -->
- Clone this repository
- Once cloned make sure Node.js is installed. 
- Have MongoDB installed. For instructions go to [MongoDB](https://docs.mongodb.com/manual/)
- Navigate to the directory where you cloned the FooDriver repository and run the command `npm i` to install all the dependencies.
- Open your favorite IDE and create your .env file.
  - Add the PORT and set it to 3000 --> `PORT=3000`
  - Add the mongodb database --> `MONGODB_TEST_URI=mongodb://[the database]`
  - Add a password e.g. --> `SECRET=lawdylawd`
- Connect to the mongodb database using `mongod --dbpath=[path to database folder]` in a new terminal
- Go to yet another terminal and run `node index.js` to fire up the web server.


## User Instructions
<!-- How to users can use to the app  -->

## Dependencies
babel-env, babel-core, babel-eslint,babel-jest,babel-polyfill,babel-register, bcrypt, dotenv, eslint, express, jest, jsonwebtoken, mongoose, mongoose-autopopulate, mongodb-memory-server, supertest
## License
<!-- License  -->
MIT License

## Links
<!-- Include links needed to be accessed  -->



<!-- #TEMP notes  and will be revised 
//what to do when start the app
// type this in terminal to see the hidden files if needed in Terminal (defaults write com.apple.finder AppleShowAllFiles YES)
//hold option and right click on the finder and relaunch to open the finder with hidden files 
// when open the vs code you need to install .env  -->
