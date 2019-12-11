//WEB322 AirBnB: Listing Models
//Required packages/ consts
const mongoose = require("mongoose");
const schema = mongoose.schema;

//Listings
const listingSchema = new schema({
    "city": {
        type:String,
        required:true
    },
    "title": {
        type:String,
        required:true
    },
    "description": String,
    "image": {
        type:String,
        required:true
    }, 
    "price": {
        type:Number,
        required:true
    },
    "available": {
        type:Boolean,
        requires:true
    }
})

const listingModel = mongoose.model("web322-db", listingSchema);

//Create properties
const l1 = new userModel({
    city: "Toronto",
    title: "Charming 2 Bedroom Condo",
    description: "Located in the heart of downtown",
    image: String,
    price: 150,
    available: true
});

const l2 = new userModel({
    city: "Halifax",
    title: "Cozy Red Townhouse",
    description: "Right by the waterfront",
    image: String,
    price: 175,
    available: true
});

const l3 = new userModel({
    city: "Montreal",
    title: "Amazing Apartment!",
    description: "Bachelor Apartment in Mile End",
    image: String,
    price: 125,
    available: false
});

const l4 = new userModel({
    city: "Vancouver",
    title: "Peaceful Condo",
    description: "Right at nature's doorstep",
    image: String,
    price: 200,
    available: true
});

//Save listings
l1.save((err)=>{
    if(err){
        console.log("An error occurred saving this listing");
    }
    else {
        console.log("Listing saved");
    }
    process.exit();
});

l2.save((err)=>{
    if(err){
        console.log("An error occurred saving this listing");
    }
    else {
        console.log("Listing saved");
    }
    process.exit();
});

l3.save((err)=>{
    if(err){
        console.log("An error occurred saving this listing");
    }
    else {
        console.log("Listing saved");
    }
    process.exit();
});

l4.save((err)=>{
    if(err){
        console.log("An error occurred saving this listing");
    }
    else {
        console.log("Listing saved");
    }
    process.exit();
});

module.exports=listingModel;