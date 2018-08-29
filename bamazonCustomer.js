var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + "\n");
    initialDisplay();
});


function initialDisplay() {
    console.log("------------BAMazon-------------");
        connection.query("select * from products", function(error, response) {
        if (error) throw error;
// // console.log(query);
            for (var i = 0; i < response.length; i++){
                console.log(response[i].item_id + " |" + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity );
                
            }
// console.log(response);
            console.log("--------------------------------");
            // connection.end();
            
            inquirer.prompt([
                {
                    name: "productId",
                    type: "input",
                    message: "What is the ID of the product you would like to buy?",
                   
                },
                {
                    name: "howMany",
                    type: "input",
                    message: "How many units would you like to purchase?"
                }
                
            ]).then(function(answer){
   
                var howMany = answer.howMany;
                var itemID = {id: answer.productId,
                              price: answer.productId.price}
                // var itemCost = [];

                if (answer.howMany <= 0){
                    console.log("Insufficient Quantity");

                } else {
                    console.log(itemID);
                
                   var query = connection.query(
                    //    "SELECT * WHERE products ?"
                    //    {
                    //        id: itemNumber
                    //    }
                       "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                       [howMany, itemID.id, itemID.price], function(err, res) {
                        // console.log('Yay, success! Your cost is ' + itemPrice);
                        // initialDisplay();

                        console.log("success!");
                        // connection.end()
                    }

                   );
                }
            });
            
        });
    }