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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user== req.user.id){ //the checking the owner of comment with the requested user id

            let postId = comment.post;
            comment.remove();
            //delete the comment id from the array of comments id in the Post database
            Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id} }, function(err,post){
                return res.redirect('back');
            });
        } else{
            return res.redirect('back');
        }        
    });
}