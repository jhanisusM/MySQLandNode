var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "cali",
    database: "bamazonDB"
});


connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});


function runSearch() {
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "What would you like to do?",
        message: "-----------------------------",
        choices: [
            "View all inventory",
            "See anythign you like in our inventory?",
            "Become one of our Suppliers. Join our Team!",
        ]
    }]).then(function (answer) {
        switch (answer.action) {
            case "View all inventory":
                displayAll();
                break;
            case "See anythign you like in our inventory?":
                buyItem();
                break;
            case "Become one of our Suppliers. Join our Team!":
                console.log("Become a supplier")
                // supplyItem();
                break;
            default: break;
        }
    });
};



// Function DIsplays all inventory
function displayAll() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " |  "
                + res[i].product_name + "   |    "
                + res[i].department_name + "     |     "
                + res[i].product_description + "     |     "
                + res[i].price);
            console.log("===========================" +
                "===========================" +
                "===========================");
        }
        runSearch();
    });
};


//Buying item
function buyItem() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "Please enter the ID# of the item you are interested in: ",
        // message: "-----------------------------",
    }]).then(function (answer) {
        let id = answer.item;
        connection.query("SELECT * FROM products WHERE ?", { id: answer.item }, function (err, res) {
            console.log("===========================" + "===========================");
            console.log("ID# chosen: " + answer.item);
            console.log("===========================" + "===========================");
            console.log("Item of Interest: " + res[0].product_name);
            console.log("===========================" + "===========================");
            console.log("Item Description: " + res[0].product_description);
            console.log("Price : $" + res[0].price);
            console.log("===========================" + "===========================");
            inquirer.prompt([{
                name: "decision",
                type: "confirm",
                message: "Would you like to purchase this item?",
            }]).then(function (answer) {
                if (answer.decision) {
                    checkInventory(id);
                }
                else {

                    runSearch();
                }
            });
        });
    });
};

function checkInventory(id) {
    let itemId = id;
    connection.query("SELECT  * FROM products WHERE ?", { id: itemId }, function (err, res) {
        let inStock = res[0].stock_quantity;
        inquirer.prompt([{
            name: "check",
            type: "input",
            message: "How many items would you like to buy?",
        }]).then(function (answer) {
            let numOfItems = answer.check;
            if (numOfItems < inStock) {
                console.log("Your Total is = $" + res[0].price * numOfItems);
                placeOrder();
            }
            else {
                console.log("Out of stock, please place a smaller order")
            }
        });
    });
};


function placeOrder() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter a Name ",
        },
        {
            type: "input",
            name: "address",
            message: "Please enter street address",
        },
        {
            type: "input",
            name: "city",
            message: "Please enter city",
        },
        {
            type: "input",
            name: "zipcode",
            message: "Please enter zipcode",
        },

    ]).then(function (answer) {
        console.log("PLease confirm name and address:");
        console.log(answer.name, '\n' +
            answer.address, '\n' +
            answer.city, '\n' +
            answer.zipcode);
        inquirer.prompt([
            {
                type: "confirm",
                message: "Is this your correct address?",
                name: "confirm",
                default: true
            },
        ]).then(function (confirmAddress) {
            if (confirmAddress.confirm) {
                console.log("Thank you for your purchase!");
                console.log("You will recieve an email shortly");
                runSearch();
            }
        })
    });

};