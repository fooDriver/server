//--------------------------------------
//* Setup
//--------------------------------------
// Safety Googles ON
'use strict';


// Dependencies
import figlet from 'figlet'; // banner generator
import inquirer from 'inquirer'; // menu interface
import vorpal from 'vorpal'; // alt CLI module
import chalk from 'chalk'; // colors

//--------------------------------------
//* Message Generator
//-------------------------------------- 
figlet('fooDriver', function(err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
  console.log('\n\n');
});

//--------------------------------------
//* CLI Setup
//-------------------------------------- 
//* Startup Menu
let questions = [
  {
    type: 'list',
    name: 'menuSelect',
    choices: [
      '1. Login',
      '2. Register',
      '3. Help',
      '4. Exit',
    ],
    message: 'Make a selection: ',
    default: function() {
      return '(enter a number)';
    },
    validate: (value) => {
      let choice = value.match(/^([1234]{1})?((?:\n?\s?){1})?$/i);
      if (choice === 1) { 
        return true;
      }
      else { return 'Invalid response. Please input a value between 1 and 4.\n'; }
    },
  },
];

// 1. Login
// 2. Register
// 3. Help
// 4. Exit

//* 1. Login
// Username
// Password

//* 2. Register
// const requireLetterAndNumber = value => {
//   if (/\w/.test(value) && /\d/.test(value)) {
//     return true;
//   }
//   return 'Password need to have at least a letter and a number';
// };
// 
// inquirer
//   .prompt([
//     {
//       type: 'password',
//       message: 'Enter a password',
//       name: 'password1',
//       validate: requireLetterAndNumber
//     },
//     {
//       type: 'password',
//       message: 'Enter a masked password',
//       name: 'password2',
//       mask: '*',
//       validate: requireLetterAndNumber
//     }
//   ])
//   .then(answers => console.log(JSON.stringify(answers, null, '  ')));

//* 3. Help

//* 4. Exit

//--------------------------------------
//* CLI Menu
//-------------------------------------- 
inquirer.prompt(questions)
  .then(answers => {
    let exit = false;
    while(!exit) {
      if(answers === 1) { console.log('I said 1\n'); }
      else if(answers === 1) { console.log('I said 2\n'); }
      else if(answers === 1) { console.log('I said 3\n'); }
      else if(answers === 1) { console.log('I said 4\n'); }
      else { exit = true; console.log('Quitting now...'); }
      // console.log(JSON.stringify(answers, null, '  '));
    }
    console.log('Disconnecting servers. Bye bye!');
    require('./src/app.js').stop;
    // STOP SERVERS and EXIT
  })
  .catch(err);


//? EXAMPLE CODE ONLY
// let questions = [
//   {
//     type: 'input',
//     name: 'user_name',
//     message: 'Enter your username:',
//   },
//   {
//     type: 'input',
//     name: 'user_pass',
//     message: "Type your secret password",
//     default: function() {
//       return 'Doe';
//     }
//   },
//   {
//     type: 'input',
//     name: 'fav_color',
//     message: "What's your favorite color",
//     transformer: function(color, answers, flags) {
//       const text = chalk(color)(color);
//       if (flags.isFinal) {
//         return text + '!';
//       }
//       return text;
//     }
//   },
//   {
//     type: 'input',
//     name: 'phone',
//     message: "What's your phone number",
//     validate: function(value) {
//       var pass = value.match(
//         /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
//       );
//       if (pass) {
//         return true;
//       }

//       return 'Please enter a valid phone number';
//     }
//   }
// ];

