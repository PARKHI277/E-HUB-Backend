const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
let refreshTokens = [];
const { sign, verify } = require("jsonwebtoken");
const auth_verify = require("../middleware/auth");
const passport = require("passport");
require('../config/gauth');

router.get('/auth',(req,res)=>{
  res.send('<a href="/api/auth/google">Auth goog</a>');
});

router.get('/auth/google', passport.authenticate('google',{scope:['email','profile']}));

router.get('/users/auth/google/callback',passport.authenticate('google',{
  successRedirect:'/api/users/auth/google/protected',
  failureRedirect:'/api/users/auth/google/unprotected'
}));

// Protected route, can only be accessed when user is logged-in
router.get("/users/auth/google/protected", (req, res) => {
    if(!req.user)
    res.redirect('/auth/callback/failure');
res.send("Welcome " + req.user);
console.log(req.user);
//     console.log("User successfully signed in with google");
// res.status(200).json({
//     success: true,
//     message: "User successfully signed in with google",
//   });
  });
  router.get("/users/auth/google/unprotected", (req, res) => {console.log("User not signed in with google");
  res.status(400).json({
      success: false,
      message: "User not signed in with google",
    });
  });
  router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
  module.exports = router;