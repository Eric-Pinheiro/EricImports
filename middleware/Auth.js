function Auth(req,res,next){
    if(req.session.usuario != undefined){
        next()
    }else{
        res.render("Login",{loggedOut:true});
    }
}

export default Auth;