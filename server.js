const express=require('express')
const app=express();

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());
app.set('view engine','ejs');
require('./controllers/posts.js')(app);
require('./data/reddit-db');




app.get("/",(req,res)=>{
     res.render('index');
});


app.get("/posts/new",(req,res)=>{
  res.render('posts-new');
});





app.listen(3000,()=>{
  console.log("server running on port "+3000);
});
