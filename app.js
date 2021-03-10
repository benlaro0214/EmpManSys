
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


// EMS MENU
function emsMenu() {
  inquirer.prompt([{
    type: "list",
    name: "menuEMS",
    message: "Please Select one of the following option",
    choices: [
      {
        name: "View all Employees",
        value: "VEMP"
      },
      {
        name: "View all Roles",
        value: "VROLE"
      },
      {
        name: "View all Departments",
        value: "VDEPT"

      }, {
        name: "Add employee",
        value: "ADDEMP"
      },
      {
        name: "Update Employee",
        value: "UPEMP"
      },
      {
        name: "Add Role",
        value: "AROLE"
      },
      {
        name: "Add Department",
        value: "ADEPT"
      },
      { name: "Quit",
        value: "ENDPROG"
      }

    ]
  }]).then(({ menuEMS }) => {
    if (menuEMS === "VEMP") {
      viewEmployee()
    } else if (menuEMS === "ADDEMP") {
      addEmployee()
    } else if (menuEMS === "AROLE") {
      addRoles();
    } else if (menuEMS === "UPEMP") {
      uEmployee();
    }
    else if (menuEMS === "ADEPT") {
      addDepartment()
    }
    else if (menuEMS === "VROLE") {
      viewRoles()
    }
    else if (menuEMS === "VDEPT") {
      viewDepartments()
    }
    else if (menuEMS === "UROLE") {
      updateRole()      
    }
    else if (menuEMS === "ENDPROG") { 
      endProg()
    }
  })
}


// DEPARTMENTS View-Add

// View Departments 
function viewDepartments() {
  console.log("Selecting all departments...\n");
  connection.query("SELECT id AS `ID`, department AS `Department` FROM departments", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    endProg();

  });
}

function addDepartment() {
  // we need to get the role data
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    const departments = res.map(element => {
      return element.id
    })
    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "Specify department: "
        }

      ])
      .then(function (answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO departments SET ?",
          answer,
          function (err) {
            if (err) throw err;
            console.log(`${answer.department} was added successfully`);
            // re-prompt the user for if they want to bid or post
            endProg();
          }
        );
      });
  })
}



// ROLES View-Add-Update

//view roles
function viewRoles() {
  console.log("Selecting all roles...\n");
  connection.query("SELECT title AS `Title`, salary AS `Salary`, depId AS `Department Id` FROM roles", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    endProg();

  });
}


function addRoles() {
  // we need to get the role data
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    const departments = res.map(element => {
      return element.id
    })
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is their title?"
        },
        {
          name: "salary",
          type: "input",
          message: "Salary range: "
        },
        // ask role question based on role data
        {
          name: "depId",
          type: "list",
          message: "Department id: ",
          choices: departments
        }

      ])
      .then(function (answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO roles SET ?",
          answer,
          function (err) {
            if (err) throw err;
            console.log(`${answer.title} was added successfully`);
            // re-prompt the user for if they want to bid or post
            endProg();
          }
        );
      });
  })
}


function updateRole() {
  // we need to get the role data
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    const roles = res.map(element => {
      return element.id
    })
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "First name: "
        },
        {
          name: "lastName",
          type: "input",
          message: "Last name: "
        },
        // ask role question based on role data
        {
          name: "roleId",
          type: "list",
          message: "Role id: ",
          choices: roles
        }

      ])
      .then(function (answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO employees SET ?",
          answer,
          function (err) {
            if (err) throw err;
            console.log(`${answer.firstName} ${answer.lastName} was added successfully`);
            // re-prompt the user for if they want to bid or post
            endProg();
          }
        );
      });
  })
}

// EMPLOYEES View-Add-Update

function viewEmployee() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT firstName AS `First Name`, lastName AS `Last Name`, roleId AS `Role Id` FROM employees", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    endProg();

  });
}

function addEmployee() {
  connection.query("SELECT id, title from roles", function (err, res) {
    if (err) throw err;
    // const lastName = res.map(element => {
    //   return element.lastName
    const roles = res.map(element => element.title)
    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "First name: "
      },{
        name: "lastName",
        type: "input",
        message: "Last name: "
      }, {
        name: "roles",
        type: "list",
        message: "Role: ",
        choices: roles
      }
    ]).then(answers => {
      const chosenRole = res.find(element => {
        return element.title === answers.roles
      });
      console.log(chosenRole.id);
      const newEmployee = {
        firstName: answers.firstName,
        lastName: answers.lastName,
        roleId: chosenRole.id
      };
      connection.query("INSERT INTO employees SET ?", newEmployee, (err, success) => {
        if (err) throw err;
        console.log(`${newEmployee.firstName} was added`);
        endProg();
      })

    })

  })

}

function uEmployee() {
  connection.query("Select * from employees", function (err, res) {
    if (err) throw err;
    //new list of first and last names
    const names = res.map(element => {
      return `${element.id}: ${element.firstName} ${element.lastName}`
    })
    connection.query("SELECT title, id from roles", function(err, success) {
      if (err) throw err;
      const roles = success.map(element => element.title);  
      inquirer.prompt([
        {
          name: "who",
          type: "list",
          choices: names,
          message: "Specify employee to update: "
        }, {
          name: "roles",
          type: "list",
          message: "Specify new role: ",
          choices: roles
        }
      ]).then(answers => {
        console.log(answers);
        const empIdToUpdate = answers.who.split(":")[0];
        console.log(empIdToUpdate)
        const chosenRole = success.find(element => {
          return element.title === answers.roles
        });
        console.log(chosenRole.id);
        connection.query("UPDATE employees SET roleId=? where id=?", [chosenRole.id, empIdToUpdate], function(err, yay) {
          if (err) throw err;
          console.log(`role updated`)
          endProg();
        })
        
      })
    })
  })

}





// END PROGRAM //

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