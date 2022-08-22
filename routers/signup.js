const express = require("express");
const router = new express.Router();
const User = require("../schema_details/userdetails");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const atob = require("atob");

const emailer = require("../services/email");


// user signup
router.post("/signup", async (req, res) => {
  try {
    const {
      userName,
      branch,
      email,
      institutionName,
      mobile,
      password,
      confirmPassword,
    } = await req.body;
    
    if (
      !userName &&
      !branch &&
      !email &&
      !mobile &&
      !password &&
      !confirmPassword
    )
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(200).send({ message: "User already exists." });
    }
    const otp = Math.floor(Math.floor(100000 + Math.random() * 900000));

    const Password = req.body.password;

    const strongPasswords =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!confirmPassword && Password)
      return res.status(400).json({
        success: false,
        message: "Confirm the password",
      });
    else if ((!confirmPassword && !Password) || (confirmPassword && !Password))
      return res.status(400).json({
        success: false,
        message: "Enter password",
      });
    if (strongPasswords.test(Password)) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(Password, salt);
      const hashconfirm = await bcrypt.hash(confirmPassword, salt);
      const user_create = new User({
        userName,
        branch,
        institutionName,
        email,
        mobile,
        password: hashPassword,
        confirmPassword: hashconfirm,
        otpuser: otp,
      });
      console.log(otp);
      
      if (hashPassword == hashconfirm) {
        //creating acess token
        const accessToken = jwt.sign(
          { user_create: user_create._id },
          process.env.TOKEN_SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );

        // creating refresh token
        const refreshToken = jwt.sign(
          { user_create: user_create._id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "2d",
          }
        );
        emailer(email, otp);  //otp sent to the user
        
        user_create
          .save()
          .then(() => {setTimeout(() => {
            User.updateOne({_id:user_create._id}, {$set:{otpuser:0}});
            console.log("Sd");}, 10000);
            res.status(201).send({
              message: "Registration successfull and OTP sent",
              userName,
              email,
              institutionName,
              branch,
              mobile,
              accessToken: `${accessToken}`,
              refreshToken: `${refreshToken}`,
            });
          })
          .catch((err) => {
            if (err.code === 11000) {
              // message = err.message;
              message = "This mobile is already exist";
              console.log(message);
            }
            if (err.name === "ValidationError") message = err.message;
            if (err.name === "CastError") message = err.message;
            if (err.name === "EmptyError") message = err.message;
            return res.status(400).json({
              success: false,
              message: message,
            });
            // console.log(err.message);
            //  res.status(400).send(err.message);
          });
      } else {
        res
          .status(400)
          .send({ message: "Password and confirmPassword do not match" });
      }
    } else {
      res.status(400).send({
        mesaage:
          "Password should be longer than 8 characters and it has to include at least one number,one uppercase letter , one special charcter and one lowercase , Password should start from uppercase Letter",
      });
//

    }
  } catch (err) {
    return res.status(400).send({ message: "Something went wrong" });
  }
});

//taking otp and updating isVerified in db

router.patch("/signup/verify", async (req, res) => {
  try {
    const accessToken = req.body.accessToken;
    const otp = req.body.otp;
    if (!accessToken && !otp)
      return res.status(400).json({
        success: false,
        message: "Send access token and OTP",
      });
    if (!accessToken)
      return res.status(400).json({
        success: false,
        message: "Send access token",
      });
    if (!otp)
      return res.status(400).json({
        success: false,
        message: "Send OTP",
      });
    const dec = accessToken.split(".")[1];
    const decode = JSON.parse(atob(dec));
    const userExist = await User.findOne({ _id: decode.user_create });
    if (!userExist)
      return res.status(400).json({
        success: false,
        message: "You are not registered.",
      });
    if (userExist.otpuser === otp) {
      await User.updateOne({ _id: decode.user_create }, { isVerified: true });
      res.status(200).json({
        success: true,
        message: "OTP correct. User is verified.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
});

// get all users

router.get("/allusers", async (req, res) => {
  try {
    const allusers = await User.find();

    res.status(200).send(allusers);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Google - auth route
// for sigin
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.

    res.redirect("/");
  }
);

module.exports = router;
