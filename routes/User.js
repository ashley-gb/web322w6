//WEB322 AirBnB: User Routing
//Required packages/ consts
const express = require('express')
const router = express.Router();
const bcrypt = require("bcryptjs");
const path = require("path");

//Const to perform operations on user models
const User = require("../models/controllers/User");

// User-registration
router.get("/user_reg", (req,res)=>{
    res.render('User/user_reg')
});

//Posting an account creation form
router.post("User/user_reg", (req,rest)=>{
    //local variables
    //Stores user account information
    const newUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    }
    
    const error = document.querySelector('.error');

    //Array to store any errors that occur
    const errors =[];

    //If email input is valid, do nothing
    //Otherwise, send error message
    if(req.body.email=="") {
        errors.push = "Please enter a valid email address";
        //Prevents form from being submitted
        event.preventDefault();
    }

    //Check password
    if(req.body.password=="" || req.body.password.length < 6 || req.body.password.length > 12){
         errors.push = "Please enter a valid password between 6-12 char long"
    }

    //Check for errors, send message if errors persist
    if(errors.length > 0) {
        res.render("User/user_reg",{
            errors:errors,
            firstName :newUser.firstName,
            lastName : newUser.lastName,
            email : newUser.email
        })
    }

    //Otherwise permit form submission
    else {
        console.log("User registration form submitted");
    }
})
//Upon successful form submission
.then(()=>{
    //Create new user
    User.save()

    //Send email to user confirming account registration via Sendgrid
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: '${req.body.email}',
      from: 'agernitz-bennett@myseneca.ca',
      subject: 'Welcome to EhBnB!',
      text: 'Hello fellow traveller, thanks for signing up!',
      html: '<strong>Hello fellow traveller, thanks for signing up!</strong>',
    };
    sgMail.send(msg);

    //Redirect user to login page
    res.redirect("/User/login");
})
//If errors occur/ submission fails
.catch(errors=>{
    console.log("An error occurred: " + errors);
})

// Login Page
router.get("/login", (req,res)=>{
    res.render('User/login')
});

//Posting a login form
router.post("/login", (req, res)=>{
    //Stores errors
    const errors = [];
    //Array to store user login
    const loginData = {
        email : req.body.email,
        password : req.body.password
    }

    //Searches the MongoDB database for matching email
    User.findOne({email:loginData.email})
    .then(User=>{
        //If no matches found, store error and inform user
        if(User==null){
            errors.push("No matching emails found");
            res.render("User/login",{
                errors: errors
            })
        }

        //Otherwise, compare password input to bcrypt version
        else {
            bcrypt.compare(loginData.password,User.password)
            .then(isMatched=>{
                //If passwords match, authenticate user and open session
                if(isMatched==true){
                    req.session.userInfo=User;
                    res.redirect("/User/dashboard");
                }

                //Otherwise, reject login attempt
                else {
                    errors.push("Incorrect password");
                    res.render("User/login", {
                        errors:errors
                    })
                }
            })
        }
    })
    //Send any caught errors to the console
    .catch(err=> {
        console.log("An error occurred: " + err);
    })
});

//Loads the Dashboard page
router.get("/dashboard",(req,res)=> {
    res.render("dashboard");
});

//Log out user: End a session
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/User/login");
})

//Exports routing to app.js
module.exports=router;