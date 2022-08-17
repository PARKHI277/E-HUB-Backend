const express = require("express");
const router = new express.Router();
const User = require("../schema_details/userdetails");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
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
      });
      if (hashPassword == hashconfirm) {
        // //creating acess token
        // const accessToken = jwt.sign(
        //   { user_create: user_create._id },
        //   process.env.TOKEN_SECRET_KEY,
        //   {
        //     expiresIn: "1d",
        //   }
        // );

        // // creating refresh token
        // const refreshToken = jwt.sign(
        //   { user_create: user_create._id },
        //   process.env.REFRESH_TOKEN_SECRET,
        //   {
        //     expiresIn: "2d",
        //   }
        // );
        res.status(200).send({
          msg: "Registration succesfull",
          user_create,
          // accessToken: `${accessToken}`,
          // refreshtoken: `${refreshToken}`,
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
