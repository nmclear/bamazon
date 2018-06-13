
var keys = require("./keys.js");

var mysql = require("mysql");
var inquirer = require("inquirer");

//========================================================================================================================
// PRIVATE INFO
//========================================================================================================================

var port_number = keys.port_number;
var host_name = keys.host_name;
var database_password = keys.database.password;
var database_name = keys.database_name;

//========================================================================================================================
// DATABASE CONNECTIONS
//========================================================================================================================

var connection = mysql.createConnection({
    // host: host_name,
    // port: port_number,
    user: "root",
    password: '',
    database: 'bamazonDB'
});

connection.connect(function(err) {
    if (err) throw err;
    //first function to run on start
    displayAllItems();
});

//========================================================================================================================
// FUNCTIONS
//========================================================================================================================

function displayAllItems() {
    var query = 'SELECT item_id, product_name, price FROM products';

    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price);
        }
    });
}
