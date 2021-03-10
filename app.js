
//Packages and CONST.
const path = require('path');
const fs = require('fs');
let mysql = require('mysql');
let inquirer = require("inquirer");
const connection = require('./utils/connection');


//connecting to DB.
connection.connect(function (err) {
if (err) throw err;
console.log(`connection id: ${connection.threadId}`);
init();
});


// Welcome mat
function init() {
  console.log(`Welcome to the Employee Management System (EMS)`)
  emsMenu();
}




function endProg() {
  inquirer.prompt([
    {
      type: "list",
      name: "continue",
      message: "Do you wish to terminate the program?",
      choices: [
        {
          name: "Yes",
          value: false
        },
        {
          name: "No",
          value: true
        }
      ]
    }
  ]).then(function (answers) {
    if (answers.continue) {
      emsMenu()
    } else {
      console.log(`Goodbye`);
      process.exit();
    }
  })
}