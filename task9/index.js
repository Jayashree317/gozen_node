// Importing required packages 
const cron = require("node-cron"); 
const express = require("express"); 
const fs = require("fs"); 

app = express(); 

// Setting a cron job 
cron.schedule("*/10 * * * * *", function() { 

	// Data to write on file 
	let data = `${new Date().toUTCString()} 
				: Server is working\n`; 
	
	// Appending data to logs.txt file 
	fs.appendFile("logs.txt", data, function(err) { 
		
		if (err) throw err; 
		
		console.log("Status Logged!"); 
	}); 
}); 

app.listen(5000,()=>{
    console.log("port is 5000");
}); 
