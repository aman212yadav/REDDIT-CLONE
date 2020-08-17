const Post = require('../models/post');
const User = require("../models/user");
module.exports = (app) => {
  app.get("/",(req,res)=>{

    Post.find({}).populate('author')
   .then(posts => {
     console.log(posts);
    res.render("posts-index", { posts});
   })
   .catch(err => {
    console.log(err.message);
   });
  });
  app.get("/posts/new",(req,res)=>{
    res.render('posts-new');
  });
  app.post("/posts/new", (req, res) => {
      if (req.user) {
          var post = new Post(req.body);
          post.author = req.user._id;

          post
              .save()
              .then(post => {

                  return User.findById(req.user._id);
              })
              .then(user => {
                  user.posts.unshift(post);
                  user.save();
                  // REDIRECT TO THE NEW POST
                  res.redirect(`/posts/${post._id}`);
              })
              .catch(err => {
                  console.log(err.message);
              });
      } else {
          return res.status(401); // UNAUTHORIZED
      }
  });
  app.get("/posts/:id",(req,res)=>{
        Post.findById(req.params.id).
        populate(
          {path:'comments',
           populate:{path:'author'}
         })
       .populate('author').then((post)=>{

          res.render("posts-show",{post:post});
        })
        .catch(err=> {
           console.log(err.message);
        });
  });
  app.get("/n/:subreddit",(req,res)=>{
        Post.find({subreddit:req.params.subreddit})
        .populate('author')
        .then(posts=> {
          res.render("posts-index",{posts:posts});
        })
        .catch(err =>{
          console.log(err);
        });
  });


};
