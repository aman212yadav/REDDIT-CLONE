const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require("../models/user");
module.exports = function(app) {
   app.post("/posts/:postId/comments",function(req,res){
          if(req.user){
         const comment=new Comment(req.body);
         comment.author=req.user._id;
         comment
         .save()
         .then(comment =>{
                 return Post.findById(req.params.postId);
         })
         .then(post =>{
           post.comments.unshift(comment);
           return post.save();
         })
         .then(post=>{
           res.redirect(`/posts/${post._id}`);
         })
         .catch(err=>{
           console.log(err);
         });
       }else{
           return res.status(401); // UNAUTHORIZED
       }
   });

 };
