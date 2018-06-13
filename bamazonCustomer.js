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
// ARRAY TO STORE PRODUCT IDs FOR SALE
//========================================================================================================================

var idArr = [];

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
    displayAllItems();
});

//========================================================================================================================
// FUNCTIONS
//========================================================================================================================

function displayAllItems() {
    var query = 'SELECT item_id, product_name, price FROM products';

    connection.query(query, function(err, res) {
        console.log(chalk.blue('========================== WELCOME TO BAMAZON ==========================\n' + 
            '---------------------------- ITEMS FOR SALE ----------------------------'
        ));
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price);
            idArr.push(res[i].item_id);
        }
        console.log(chalk.blue('======================================================================='));
        buyProduct();
    });
}

function buyProduct() {
    inquirer
      .prompt({
        name: "item_id",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        validate: validateID
      })
      .then(function(answer) {
        var buyID = answer.item_id
        inquirer
        .prompt({
            name: "units",
            type: "input",
            message: "How many units would you like to purchase?",
        })
        .then(function(answer) {
            var buyUnits = answer.units;            
            checkOrder(buyID, buyUnits);
        });
    });
}

function checkOrder(buyID, buyUnits){
    var query = 'SELECT * FROM products WHERE ?';
    connection.query(query, {item_id: buyID}, function(err, res) {
  
        var result = res[0];
        var name = result.product_name;
        var stockUnits = result.stock_quantity;
        var itemPrice = result.price;
        var unitsLeft = stockUnits-buyUnits;

        console.log('Checking ' + name + ' stock quantity..');

        if(unitsLeft < 0){
            console.log(chalk.red('Insufficient quantity.'))
            console.log('We only have ' + stockUnits + ' of ' + name + ' in stock.');
        } else {
            updateProduct(buyID,unitsLeft);
            var totalCost = buyUnits * itemPrice;
            console.log(chalk.green('Approved!'));
            console.log('Total Cost: $' + totalCost + '\n' +
                'Thank you for the purchase of the ' + name + '.');
        }
        buyAgain();
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
            buyProduct();
        } else {
            console.log(chalk.blue('Thank you! Come again soon!'));
            process.exit();
        }
    });
}

function updateProduct(id,units) {
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query,
        [
            {
                stock_quantity: units
            },
            {
                item_id: id
            }
        ]
    );
}

function validateID(item_id){
    var check = false;
    for(var i = 0; i < idArr.length; i++){
        if(idArr[i] === parseInt(item_id)){
            check = true;
        }
    }
    if(check){
        return true;
    } else {
        console.log(chalk.red('\nPlease select a valid ID.'));
    }
}
