const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    //here req.body.post => name="post" value="post._id" in comment form
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                user: req.user._id,
                post: req.body._id
            }, function(err,comment){
                if(comment){
                    post.comments.push(comment);//pushing the id of comment to array for comment id in post schema
                    post.save();
                    return res.redirect('/');
                }
            });
        }
    });
}