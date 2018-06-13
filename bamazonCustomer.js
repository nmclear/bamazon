
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
    host: 'localhost',
    port: 3306,
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
    buyProduct();
}

function buyProduct() {
    inquirer
      .prompt({
        name: "item_id",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
      })
      .then(function(answer) {
        var buyID = answer.item_id
        if(isNaN(buyID)){
            console.log('Please select a valid ID.')
            buyProduct();
        } else {
            inquirer
            .prompt({
                name: "units",
                type: "input",
                message: "How many units would you like to purchase?",
            })
            .then(function(answer) {
                var buyUnits = answer.units;
                console.log('item to purchase: ' + buyID);
                console.log('number of units: ' + buyUnits);
                var query = 'SELECT item_id, product_name, price FROM products';
            
                checkOrder(buyID, buyUnits);
            });
        }
    });
}

function checkOrder(buyID, buyUnits){
    var query = 'SELECT * FROM products WHERE ?';
    connection.query(query, {item_id: buyID}, function(err, res) {
  
        var result = res[0];
        var stockUnits = result.stock_quantity;

        console.log(stockUnits + '.. stock units');

        if((stockUnits-buyUnits) < 0){
            console.log('Insufficient quantity.');
            buyAgain();
        } else {
            console.log('true');
        }
    });
}

function buyAgain(){
    inquirer
    .prompt({
        name: "buy",
        type: "confirm",
        message: "Do you want to buy another item?",
    })
    .then(function(answer) {
        if(answer.buy){
            buyAgain();
        } else {
            console.log('Thank you! Comeback again!');
            process.exit();
        }
    });
}