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
                // buyItem();
                break;
            case "Become one of our Suppliers. Join our Team!":
                console.log("Become a supplier")
                // supplyItem();
                break;
            default: break;
        }
    });
}





function displayAll() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id+ "   |    "
            + res[i].product_name+ "   |    " 
            + res[i].department_name+ "     |     " 
            + res[i].product_description+ "     |     " 
            + res[i].price );
        }
        runSearch();
    });
}