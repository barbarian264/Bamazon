var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({

  host: "localhost",
  user: "jbarbarian",
  password: "Jxbox*500",
  database: "bamazon",
  port:3306

});


inquirer
    .prompt([{
            type: "input",
            message: "Choose product ID:",
            name: "productid"
        },
        {
            type: "input",
            message: "Choose amount to purchase:",
            name: "quantity"
        }

    ]).then(function(response){


    connection.connect(function(err){
    
        if(err) throw err;


    	connection.query(
    		"SELECT stock_quantity FROM products WHERE item_id=?",

    		[response.productid],

    	    function(err,res){

    	    	for(i=0;i<res.length;i++) {

    	    		var cantidad = res[i].stock_quantity;
    	    	}

                var total = cantidad - response.quantity;


                    if(total<0) {
                    	console.log('insufficient stock!');
                    } 

                    else {
                    	connection.query(
                    		"UPDATE products SET ? WHERE ?",

                    		[{stock_quantity:total},{item_id:response.productid}],

                    		function(err,res) {

                    			console.log("We have " + total + " in stock left. Thanks for your purchase");
                    		}
                    	);
                    }



    	    }
    	);

   });

});
