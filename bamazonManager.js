require("dotenv").config();

var keys = require("./keys.js");

var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require('chalk');

var idArr = [];
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
    var query = 'SELECT * FROM products';
    connection.query(query, function(err, res) {
        console.log(chalk.blue('================================ BAMAZON MANAGERS ===============================\n' + 
            '-------------------------------- ITEMS FOR SALE ---------------------------------'
        ));
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || Stock: " + res[i].stock_quantity);
            idArr.push(res[i].item_id);
        }
        console.log(chalk.blue('================================================================================'));
        anotherTask();
    });
}

function viewLowInventory(){
    var query = 'SELECT * FROM products WHERE stock_quantity <6';
    connection.query(query, function(err, res) {
        console.log(chalk.blue('================================ BAMAZON MANAGERS ===============================\n' + 
            '----------------------------------- LOW INVENTORY -----------------------------------'
        ));
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || Stock: " + res[i].stock_quantity);
        }
        console.log(chalk.blue('================================================================================'));
        anotherTask();
    });
}

function addInventory(){
    var query = 'SELECT * FROM products';
    connection.query(query, function(err, res) {
        console.log(chalk.blue('================================ BAMAZON MANAGERS ===============================\n' + 
            '-------------------------------- ITEMS FOR SALE ---------------------------------'
        ));
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || " + res[i].product_name + " || Stock: " + res[i].stock_quantity);
            idArr.push(res[i].item_id);
        }
        console.log(chalk.blue('================================================================================'));
    
        inquirer
        .prompt([
        {
            name: "item_id",
            type: "input",
            message: "What is the ID of the product you would like to add inventory?",
            validate: validateID
        },
        {
            name: "units",
            type: "input",
            message: "How many units do you want to add?",
            validate: validateNum
        }
        ])
        .then(function(answer) {
            var updId = answer.item_id;
            var addedAmt = answer.units;
            var currentAmt;
            var newTotal;

            var query2 = 'SELECT * FROM products WHERE ?';
            connection.query(query2, {item_id: updId}, function(err, ress) {

                currentAmt = ress[0].stock_quantity;
                newTotal = parseInt(currentAmt) + parseInt(addedAmt);
            
                var query3 = "UPDATE products SET ? WHERE ?";
                connection.query(query3,
                    [
                        {
                            stock_quantity: newTotal
                        },
                        {
                            item_id: updId
                        }
                    ]
                );
                console.log(chalk.green(ress[0].product_name + ' stock updated to ' + newTotal + '.'));
                anotherTask();
            });
        });
    });
}

function addProduct(){

    inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the product you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department does the product belong in?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of the product?",
        validate: validateNum
       },
      {
        name: "stock",
        type: "input",
        message: "What is the stock quantity of the product?",
        validate: validateNum
       }
    ]).then(function(response){

        var query = "INSERT INTO products SET ?";
        connection.query(query,
            {
                product_name: response.product,
                department_name: response.department,
                price: response.price,
                stock_quantity: response.stock
            },
            function(err) {
                if (err) throw err;
                console.log(chalk.green(response.product + " was added successfully!"));
                console.log('Product: ' + response.product);
                console.log('Department: ' + response.department);
                console.log('Price: ' + response.price);
                console.log('Stock: ' + response.stock);
                anotherTask();
            }
        );
    });
}

function anotherTask(){
    inquirer
    .prompt({
        name: "task",
        type: "confirm",
        message: "Do you want to perform another task?",
    })
    .then(function(answer) {
        if(answer.task){
            managerScreen();
        } else {
            console.log(chalk.blue('Exiting manager mode.'));
            process.exit();
        }
    });
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

function validateNum(input){
    if(!isNaN(input)){
        return true;
    } else {
        console.log(chalk.red('\nPlease enter number.'));
    }
}