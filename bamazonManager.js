require("dotenv").config();

var keys = require("./keys.js");

var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require('chalk');

//========================================================================================================================
// PRIVATE INFO
//========================================================================================================================

var port_number = keys.host.port_number;
var host_name = keys.host.host_name;
var database_password = keys.database.password;
var database_name = keys.database.name;

//========================================================================================================================
// DATABASE CONNECTIONS
//========================================================================================================================

var connection = mysql.createConnection({
    host: host_name,
    port: port_number,
    user: "root",
    password: database_password,
    database: database_name
});

connection.connect(function(err) {
    if (err) throw err;
    //first function to run on start
    managerScreen();
    
});

//========================================================================================================================
// FUNCTIONS
//========================================================================================================================

function managerScreen() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
            viewProducts();
            break;
  
        case "View Low Inventory":
            viewLowInventory();
            break;
  
        case "Add to Inventory":
            addInventory();
            break;
  
        case "Add New Product":
            addProduct();
            break;
        }
    });
}

function viewProducts(){
    console.log('view products');
}

function viewLowInventory(){
    console.log('view low inv.');
}

function addInventory(){
    console.log('add inventory');
}

function addProduct(){
    console.log('add product');
}