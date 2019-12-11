/*
WEB 322: Assignment 4-6
Professor: Kadeem Best
Student Name: Ashley Gernitz-Bennett
Student No: 133046185
*/

//Required variables/ packages
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const methodOverride = require("method-override");
const session = require("express-session");

const HTTP_PORT = process.env.PORT || 8080;

//Loads environment variables into the app
require("dotenv").config({path:'./config/key.env'});

//Import routing objects into app
const generalRoutes = require("./routes/General.js");
const listingRoutes = require("./routes/Listings");
const userRoutes = require("./routes/User");

//Creates the app object
const app = express();

//Body parser middleware setup
app.use(bodyParser.urlencoded({extended: true}));

//Static file setup
app.use(express.static('public'));

//Handlebars setup
app.engine(".hbs", exphbs({extname: ".hbs"}));
app.set("view engine", ".hbs");

//Informs system to utilize fileupload
app.use(fileupload())

//Overrides the Post-delete method
app.use(methodOverride('_method'));

//Mapping for Router Objects
app.use("/", generalRoutes);
app.use("/listing", listingRoutes);
app.use("/user", userRoutes);

//Hooks app up to MongoDB server via mongoose
const MONGO_DB_URL= "ashley_gb:<password>@web322-5nq6h.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(MONGO_DB_URL, {useNewUrlParser: true})
.then(()=>{
    console.log("Successfully connected to MongoDB Database");
})
.catch((err)=>{
    console.log("MongoDB connection unsuccessful: " + err);
})

//Variable to hold URL-> Should be able to access this via config/key.js

//Connects mongoose with our MongoDB Atlas DB
mongoose.connect(DBURL, {useNewUrlParser: true})
.then(()=>{
    console.log("Success! Database is connected.");
})
//Error catching
.catch(err=>{
    console.log("An error occurred: " + err);
})

//General Errors, 404
app.use((req, res)=>{
    res.status(404).send("Page Not Found.");
})

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, (req, res)=>{
    console.log("Connected to server! Listening on: " + HTTP_PORT);
});