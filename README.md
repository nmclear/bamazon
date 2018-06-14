# Bamazon Node App
Bamazon is a CLI node application that serves as an Amazon-like storefront for buying and selling goods. The application uses a MySQL database to store products, departments, price, and quantities.

### Technologies Used:
* Node.js
* npm
* mySQL

### Required npm Packages:
* [Inquirer](https://www.npmjs.com/package/inquirer) - used for user input
* [mySQL](https://www.npmjs.com/package/mysql) - used to connect to database
* [Chalk](https://www.npmjs.com/package/chalk) - text color in console

## Install Instructions:
* clone repository with SSH using:
    <pre>git@github.com:nmclear/bamazon.git</pre>
* Install the dependencies stated in the package.JSON file by: 
    <pre>npm install</pre>
* Copy the schema.sql file code into mySQL workbench query to create the database.
* Create a .gitignore and copy the following code into it:
    <pre>
        node_modules
        .DS_Store
        .env
    </pre>
* Create a .env file to store your database info (see example)
    <pre>
    #Host Connection
    HOST_NAME=your_host_name (often localhost)
    PORT_NUMBER=database_port_number
    ROOT_USER=root_user_name (often root)

    #Database Information
    DATABASE_NAME=your_database_name
    DATABASE_PASSWORD=your_database_password
    </pre>
* Congrats! The app is now ready to use!

## How to Use:
### Customer App
View and purchase products
* Load file: <pre> node bamazonCustomer.js </pre>
* A table with the items available for purchase will be displayed.
* Select the item ID you would like to purchase.
* Select the quantity of the product you would like to purchase.
* If there is sufficient quantity, transaction will finalize and you'll be alerted the final price. Else, you'll be alerted insufficient quantity.
* If you would like to make another, type Y for yes.

### Manager App
View Products for Sale, View Low Inventory, Add New Inventory, Add New Product
* Load file: <pre> node bamazonManager.js </pre>
* A list will appear with the manager options.
* Select one of the following options:
    * View Products for Sale - view products currently selling
    * View Low Inventory - view products with less than 5 items in stock
    * Add to Inventory - add stock to existing products
    * Add New Product - create a new product to sell
* Following the command prompts to complete your transaction.

#### Any Advice?
* I hope you enjoyed the game! How many did you get correct?
* Feel free to reach out! I would greatly appreciate any tips or feedback on the visuals or code.

#### Cheers!