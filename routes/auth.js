var express = require('express');
var app = express();
var database = require('../config/database');
var authValidations = require('../validations/validate-login');
let passwordHash = require('password-hash');
let jwt = require('jsonwebtoken')

// Login :- This route will authnticate the user and log the in
app.post('/login', (req, res) => {
	let requestBody = req.body
	// Validating email id, and password of user.
	const {error} = authValidations(requestBody)
	if (error) {
        res.json({
            message: error.details[0].message
        })
    }else{ 
    	let email = requestBody.email
    	let password = requestBody.password

    	sql = `SELECT * FROM USERS WHERE EMAIL = '${email}'`
	    database.query(sql, (err, result) => {
	            if (err) {
	                res.status(400).send(err);
	                return;
	            }
	            // if user exists then result varibale contains more than 1 objects
	            if (result.length){
	            	// Checking hash password with password entered by user
	            	let hashedPassword = result[0].password
	            	if (passwordHash.verify(password, hashedPassword)){
	            		let { id, first_name, last_name, email } =  result[0]
	            		let token = jwt.sign({id, first_name, last_name, email}, 'ishaPrivateKey')
	            		res.send({
	            			isLoggedIn: true,
	            			token: token
	            		})
	            	}
	            	else{
	            		res.send({
	            			message: "Invalid Email id / Password"
	            		})	
	            	}
	            }else{
	            	res.send({
            			message: "Email not exist. Please create an account"
            		})	
	            }
	    });
    }

	
})

module.exports = app