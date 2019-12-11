//Middleware: Function to verify users are permitted to perform actions

//For Regular user access
const hasUserAccess = (req,res,next)=>{
    if(req.session.user==null){
        res.redirect("/User/login");
    }
    
    else {
        next();
    }
}

module.exports=hasUserAccess;