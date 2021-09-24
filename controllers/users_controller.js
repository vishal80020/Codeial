const User = require('../models/user');


module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){
                return res.redirect('/users/sign-in');
            } else{
                if(user){
                    return res.render('user_profile',{
                        title:"User Profile",
                        user:user
                    });
                } else{
                    return res.redirect('/users/sign-in');
                }
            }
        });
    } else {
        return res.redirect('/users/sign-in');
    }
    
   
}

//render the sign up page
module.exports.signUp = function(req,res){
    res.render('user_sign_up',{
        title: "Codeial | Sign UP"
    });
}

//render the sign in page
module.exports.signIn = function(req,res){
    res.render('user_sign_in',{
        title: "Codeial | Sign IN"
    });
}

//get the sign up data
module.exports.create = function(req,res) {
    if(req.body.password !=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in finding user in signing up');
                    return;
                }else{
                    return res.redirect('/users/sign-in')
                }
            });
        } else{
            return res.redirect('back');
        }
    });
}

//get sign in data and create Session
module.exports.createSession = function(req,res) {
    
    // steps tp authenticate
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in signing in');
            return;
        } else{
            //handle user found
            if(user){
                //handle password doesn't match
                if(user.password != req.body.password){
                    return res.redirect('back');
                }

                //handle session creation
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');


            } else{
                //handle user not found
                return res.redirect('back');
            }
        }
    });
}

module.exports.destroySession = function(req,res) {
    res.cookie('user_id',null);
    res.redirect('/users/sign-in');
}