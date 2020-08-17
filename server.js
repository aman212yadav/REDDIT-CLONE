require('dotenv').config();

const express=require('express')
const app=express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser')
var jwt=require("jsonwebtoken");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

// Add after body parser initialization!
app.use(expressValidator());

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  console.log(req.cookies);
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  global.currentUser=req.user

  next();
};
app.use(checkAuth);


// Use Body Parser

app.set('view engine','ejs');
require('./controllers/replies.js')(app);
require('./controllers/posts.js')(app);
require('./data/reddit-db');
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app)









app.listen(3000,()=>{
  console.log("server running on port "+3000);
});
module.exports = app;
