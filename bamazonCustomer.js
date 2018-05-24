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
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        message: "-----------------------------",
        choices: [
            "View all inventory",
            "See anythign you like in our inventory?",
            "Become one of our Suppliers. Join our Team!",
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View all inventory":
                displayAll();
                break;
            case "See anythign you like in our inventory?":
                console.log("Buy item!")
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
            console.log(res[i].id + "   |    "
                + res[i].product_name + "   |    "
                + res[i].department_name + "     |     "
                + res[i].product_description + "     |     "
                + res[i].price);
        }
        runSearch();
    });
};


//Buying item
function buyItem() {
    inquirer.prompt({
        name: "item",
        type: "input",
        message: "Please enter the ID# of the item you are interested in: ",
        // message: "-----------------------------",
    }).then(function (answer) {
        let id = answer.item;
        connection.query("SELECT * FROM products WHERE ?", { id: answer.item }, function (err, res) {
            console.log("------------------------")
            console.log("ID# chosen: " + answer.item);
            console.log("Item of Interest: " + res[0].product_name);
            console.log("------------------------")
            console.log("Item Description: " + res[0].product_description);
            console.log("------------------------")
            console.log("Price : $" + res[0].price);
            console.log("------------------------");
            inquirer.prompt({
                name: "decision",
                type: "confirm",
                message: "Would you like to purchase this item?",
            }).then(function (answer) {
                let respuesta = answer.decision;
                console.log(respuesta);
                if (respuesta == true) {
                    console.log("You bought it!");
                    console.log("Run a quick check if there's enough inventory ");
                    checkInventory(id);
                }
                buyItem();
            });
        });
    });
};

function checkInventory(id) {
    let itemId = id;
    console.log("We are inside check inventroy " + id);
    inquirer.prompt({
        name: "check",
        type: "input",
        message: "How many items would you like to buy?",
    }).then(function (answer) {
        let numOfItems = answer.check;
        console.log(numOfItems);
    });
    connection.query("SELECT * FROM products WHERE ?", { id: itemId }, function (err, res) {
        let numOfItemsQuery = res[0].stock_quantity;
        console.log("Stock wantity is  : " + res[0].stock_quantity)
        if (numOfItemsQuery >= 10) {
            placeOrder();
        }
        else {
            if (numOfItems > numOfItemsQuery) {
                console.log("You can not place an order of that many items");
                console.log("Please place an order of " + numOfItemsQuery + "items or less");
            }
        };
    });
};

function placeOrder() {
    console.log("We are inside placeOrder");
    inquirer.prompt(
        {
            name: "name",
            message: "Please enter a Name ",
        },
        {
            name: "address",
            message: "Please enter street address",
        },
        {
            name: "city",
            message: "Please enter city",
        },
        {
            name: "zipcode",
            message: "Please enter zipcode",
        },

    ).then(function (answer) {
        console.log("PLease confirm name and address:");
        let userInfo = (answer.name, answer.address, answer.city, answer.zipcode);
        console.log(userInfo);
        // console.log(answer.address);
        // console.log(answer.city);
        // console.log(answer.zipcode);
    });

};