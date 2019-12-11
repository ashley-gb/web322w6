//WEB322 AirBnB: General Routing
//Required packages/ consts
const express = require('express')
const router = express.Router();

//Home Page
router.get("/",(req,res)=>
{
    res.render("General/home");
});

//Post a search for listings
router.post("/", (req,res)=>{
    //Stores errors
    const errors = [];  
     //Array to store user parameters
     const searchData = {
        city: req.body.city,
        checkin: req.body.checkIn,
        checkout: req.body.checkOut,
        guests: req.body.guests
    }

    //Searches the MongoDB database for matching listings
    Listings.findOne({city:searchData.city})
    .then(Listings=>{
        //If no matches found, store error and inform user
        if(Listings==null){
            errors.push("No matching listings found");
            res.render("General/home",{
                errors: errors
            });
        }

        //Otherwise, display options
    })
});


//Exports routing to app.js
module.exports=router;