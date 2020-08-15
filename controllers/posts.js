const Post = require('../models/post');

module.exports = (app) => {
  app.get("/",(req,res)=>{
    Post.find({}).lean()
   .then(posts => {
     console.log(posts);
    res.render("posts-index", { posts:posts });
   })
   .catch(err => {
    console.log(err.message);
   });
  });
  app.get("/posts/new",(req,res)=>{
    res.render('posts-new');
  });
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      console.log("success");
      return res.redirect(`/`);
    })
  });
  app.get("/posts/:id",(req,res)=>{
        Post.findById(req.params.id).populate('comments').then((post)=>{
          console.log('post'+post);
          res.render("posts-show",{post:post});
        })
        .catch(err=> {
           console.log(err.message);
        });
  });
  app.get("/n/:subreddit",(req,res)=>{
        Post.find({subreddit:req.params.subreddit})
        .then(posts=> {
          res.render("posts-index",{posts:posts});
        })
        .catch(err =>{
          console.log(err);
        });
  });


};
