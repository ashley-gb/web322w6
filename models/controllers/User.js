//WEB322 AirBnB: User Models
//Required packages/ consts
const mongoose = require("mongoose");
const schema = mongoose.schema;
const bcrypt = require("bcryptjs");


//Users Schema
const userSchema = new schema({
    "firstName": {
        type:String,
        required:true
    },
    "lastName": {
        type:String,
        required:true
    },
    "email": {
        type:String,
        required:true
    },
    "password": {
        type:String,
        required:true
    },
    "admin": {
        type:Boolean,
        required:true,
        default:false
    },
    "type": {
        type:String,
        default:"User"
    },
    "dateCreated": {
        type:Date,
        default: Date.now()
    }
});

//Stores this in MongoDB database
const userModel = mongoose.model("web322_db", userSchema);

//Create users
//Admin
const agb = new userModel({
    firstName: "Ashley",
    lastName: "Gernitz-Bennett",
    email: "agernitz-bennett@myseneca.ca",
    password: "web322",
    admin: true 
});

//Save the admin
agb.save((err)=>{
    if(err){
        console.log("An error occurred saving the admin");
    }
    else {
        console.log("Admin agb successfully saved");
    }
    process.exit();
});

//Informs the program to hash the password once the new User has been registered/saved
userSchema.pre("save",(next)=>{
    bcrypt.genSalt(10)
    .then(salt=>{
        bcrypt.hash(this.password,salt)
        .then(hash=>{
            this.password=hash
            next();
        })
    })
})

//Exports the model to main app
module.exports=userModel;