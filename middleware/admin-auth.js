//Middleware: Function to verify users are permitted to perform actions

//For Admin access
const hasAdminAccess = (req,res,next)=>{
    if(req.session.user==null){
        res.redirect("/User/login");
    }
    
    else {
        //Check whether user is an admin
        userModel.find({email: userModel.email}, "admin")
        .exec()
        .then(()=>{
            //If user is an admin, authorize access
            if(userModel.admin == true){
                next();
            }
            //Otherwise, deny request
            else {
                console.log("Sorry, you don't have permission to do that.");
            }
        })
        //Error catching
        .catch(err=>{
            console.log("An error occurred: " + err);
        })
    }
}

module.exports=hasAdminAccess;