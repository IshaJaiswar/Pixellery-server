var express = require('express');
var app = express();
var database = require('../config/database');

//Register :- This route will store the new user data into database
app.post('/new-collection', (req, res) => {
	let requestBody = req.body

	let user_id = requestBody.user_id
	let collection_name = requestBody.collection_name

	let sql = `SELECT * FROM collections where collection_name = '${collection_name}' and user_id = ${user_id}`

	database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ message: err});
            return;
        }else{
            if(result.length){
            	res.status(200).send("Collection alreday exists!")
            }else{
    			let sql = `INSERT INTO COLLECTIONS (COLLECTION_NAME, USER_ID) VALUES('${collection_name}', ${user_id})`
				database.query(sql, (err) => {
			        if (err) {
			            res.status(400).json({ message: err});
			            return;
			        }else{
			            res.status(200).send("New Collection Added");
			            return
			        }
				});        	
            }
        }
	});
	
})

app.get('/get-collection/:id', (req, res) => {
	const userid = req.params.id
	let sql = `SELECT distinct collection_name FROM COLLECTIONS WHERE USER_iD=${userid}`

	database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ message: err});
            return;
        }else{
            res.send(result)
            return
        }
	});
})


app.post('/add-to-collection', (req, res) =>{
	let requestBody = req.body

	let resource_id = requestBody.resource_id
	let collection_name = requestBody.collection_name

	let sql = `SELECT id from COLLECTIONS where collection_name = '${collection_name}'`

	database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ message: err});
            return;
        }else{
        	if(result.length){
        		let collection_id = result[0].id
        		let sql = `SELECT * FROM collection_resource where resource_id = ${resource_id} and collection_id = ${collection_id}`
   
        		database.query(sql, (err, result) => {
			        if (err) {
			            res.status(400).json({ message: err});
			            return;
			        }

			        if(result.length){
			        	res.status(200).send("Already in your collection!")
			        	return
			        }else{
			        	let sql = `INSERT INTO COLLECTION_RESOURCE (COLLECTION_ID, RESOURCE_ID) VALUES(${collection_id}, ${resource_id})`
			        	database.query(sql, (err) => {
				        if (err) {
				            res.status(400).json({ message: err});
				            return;
				        }else{
				            res.status(200).send("Added to Collection");
				            return
				        }
				});	
			        }
				});
				
        	}
            
        }
	});

})
module.exports = app;