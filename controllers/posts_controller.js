const Post = require('../models/post');

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id //this was set in setAuthenticatedUser in passport local startagy file
    }, function (err, post) {
        if (err) {
            console.log('Error in creating a Post');
            return;
        }
        return res.redirect('back');
    });
}