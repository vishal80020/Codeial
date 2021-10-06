const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id //this was set in setAuthenticatedUser in passport local startagy file
    }, function (err, post) {
        if (err) {
            console.log('Error in creating a Post');
            return;
        }
        return res.redirect('back');//going to homepage as it was originated from there to display the data
    });
}

module.exports.destroy = function (req, res) {
    //req.params.id = id of the post
    Post.findById(req.params.id, function (err, post) {
        //here post.user gives id of the user as user id is defined in the post schema
        if (post.user == req.user.id) { //req.user is already present in session cookies while checking authentication
            //ideally it should be req.user._id but we need string to compare req.user.id
            //the user who has reuested to delete should be author of that post then only he can delete
            post.remove();

            Comment.deleteMany({ post: req.params.id }, function (err) { //post id stored in Comment Schema
                return res.redirect('back');
            });
        } else {
            //if we don't find any post with given id we should throw error but for now going back
            return res.redirect('back');
        }
    })
}