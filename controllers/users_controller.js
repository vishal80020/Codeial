const User = require('../models/user');


module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    });

}


module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) { // if user who is clicking on update form should be able to edit only his/her details
        User.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email }, function (err, user) {
            return res.redirect('/');
        });

    } else {
        return res.status(401).send('Unauthorized');
    }
}




//render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign UP"
    });
}

//render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign IN"
    });
}

//get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding user in signing up');
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in finding user in signing up');
                    return;
                } else {
                    return res.redirect('/users/sign-in')
                }
            });
        } else {
            return res.redirect('back');
        }
    });
}

//get sign in data and create Session
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();
    return res.redirect('/')
}