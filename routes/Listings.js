//WEB322 AirBnB: Listing Routes
//Required packages/ consts
const express = require('express')
const router = express.Router();
const Listings = require("../models/controllers/Listings");
//Connects to middle authorization functions
const adminAccess = require("../middleware/admin-auth");
const userAccess = require("../middleware/user-auth");

//Add Listing
router.get("/add", adminAccess, (req,res)=>{
    res.render("Listings/addListing");
});

//Posting a new property listing
router.post("/add", adminAccess, (req,res)=>{
    const errors = [];

    const newListing = {
        city: req.body.city,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
    }

    //Check whether user uploads a picture
    if(req.files==null){
        errors.push("Please upload a picture of the listing");
    }
    else {
        if(req.files.image.mimetype.indexOf("image")==-1){
            errors.push("Invalid file extension");
        }
    }
    //Save the new listing in DB
    const listing = new Listings(newListing)
    listing.save()
    .then((listing)=>{

        //Upload listing photo to db
        req.files.image.name = "db_${user._id}${path.parse(req.files.image.name).ext}";
        req.files.image.mv("public/img/${req.files.profilePic.name}")
        .then(()=>{
            console.log("Image uploaded");
        })
        console.log("Your listings has been added to the DB!");
        res.redirect("/Listings/viewListings");
    })
    .catch((err)=>{
        console.log("An error occurred: " + err);
    })
});

//Edit Listings
router.get("/edit/:id", adminAccess, (req,res)=>{
    Listings.findById(req.params.id)
    .then((listings)=>{
        res.render("Listings/editListing", {
            lists: listings
        })
    }) 
});

//View Listings
//Accessible to all site users
router.get("/view", (req,res)=>{
    Listings.find()
    .then((listings)=>{
        res.render("Listings/viewListings", {
            lists: listings
        });
    })
    .catch(err=>{
        console.log("An error occurred: " + err);
    })
    
});

//Exports routing to app.js
module.exports=router;