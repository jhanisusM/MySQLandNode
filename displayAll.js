var inquirer = require("inquirer");
var displayAll = function (){
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

module.exports = displayAll;