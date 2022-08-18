const express = require("express");
const router = new express.Router();
const User = require("../schema_details/userdetails");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const atob = require("atob");
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
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(200).send({ msg: "User already exists." });
    }
    const otp = Math.floor(Math.floor(100000 + Math.random() * 900000));

    const Password = req.body.password;

    const strongPasswords =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

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
        user_create
          .save()
          .then(() => {
            res.status(201).send({
              msg: "Registration sucessfull",
              userName,
              email,
              institutionName,
              branch,
              mobile,
              accessToken: `${accessToken}`,
              refreshtoken: `${refreshToken}`,
            });
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      } else {
        res
          .status(400)
          .send({ msg: "Password and confirmPasword are not matching" });
      }
    } else {
      console.log("p");
      res.status(400).send({ msg: "Please enter strong password" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// otp generation during signup
router.post("/otp-send", async (req, res, next) => {
  // const token = req.body.accessToken;
  // const dec = token.split(".")[1];
  // const decode = JSON.parse(atob(dec)); //contains Userid
  // console.log(dec);

  const userexixt = await User.findOne({ email: req.body.email });

  if (userexixt) {
    try {
      console.log(userexixt.otpuser);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.Email,
          pass: process.env.Password,
        },
      });
      const mailOptions = {
        from: "testapi277@gmail.com",
        to: userexixt.email,
        subject: "Your otp for verification",
        text: userexixt.otpuser,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Otp sent to your entered email");
        }
      });
      res.status(200).send("otp has been sent to your email");
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  } else {
    res.send("Please enter valid email id");
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
//  msg: "Registration sucessfull",
//             userName,
//             email,
//             institutionName,
//             branch,
//             mobile,
//             accessToken: `${accessToken}`,
//             refreshtoken: `${refreshToken}`,
