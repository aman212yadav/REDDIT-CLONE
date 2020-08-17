const User = require("../models/user");
const jwt = require('jsonwebtoken');


module.exports = (app) => {
  // SIGN UP FORM
  app.get("/sign-up", (req, res) => {
    res.render("sign-up");
  });
  app.post("/sign-up", (req, res) => {
    // Create User
    const user = new User(req.body);

    user
      .save()
      .then(user => {
        var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect("/");
      })
      .catch(err => {
        console.log("error occured");
        console.log(err.message);
      return res.status(400).send({ err: err });
      });
  });
  app.get('/login',(req,res)=>{
      res.render('sign-in');
  });
  app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }, "username password")
    .then(user => {
      if (!user) {

        return res.status(401).send({ message: "Wrong Username or Password" });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: "Wrong Username or password" });
        }

        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
          expiresIn: "60 days"
        });
        // Set a cookie and redirect to root
        res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
        res.redirect("/");
      });
    })
    .catch(err => {
      console.log(err);
    });
  });
  app.get('/logout', (req, res) => {
   res.clearCookie('nToken');
   res.redirect('/');
 });

}
