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

router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ message: "This email is not registred" });

  // password is correct or not
  const validpass = await bcrypt.compare(req.body.password, user.password);

  if (!validpass) {
    return res.status(400).send({ message: "wrong password" });
  } else {
    let accessToken = jwt.sign({ user }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });

    let refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    refreshTokens.push(refreshToken);
    res.status(200).send({
      message: "Login Sucess",
      userName: user.userName,
      email: user.email,
      institutionName: user.institutionName,
      branch: user.branch,
      mobile: user.mobile,
      isVerified: user.isVerified,
      isAdmin: user.isAdmin,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
});

// Creates a new accessToken using the given refreshToken;
router.post("/refresh", auth_verify, (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.json({ message: "Refresh token not found, login again" });
  }

  // If the refresh token is valid, create a new accessToken and return it.
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (!err) {
      const accessToken = jwt.sign({ username: user.name }, "access", {
        expiresIn: "20s",
      });
      return res.json({ success: true, accessToken });
    } else {
      return res.json({
        success: false,
        message: "Invalid refresh token",
      });
    }
  });
});

// Middleware to authenticate user by verifying his/her jwt-token.
async function auth(req, res, next) {
  // let token = req.headers["authorization"];
  let token = req.body.accessToken;

  // token = token.split(" ")[1]; //Access token
  console.log(token);

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, user) => {
    if (user) {
      req.user = user;
      next();
    } else if (err.message === "jwt expired") {
      return res.json({
        success: false,
        message: "Access token expired",
      });
    } else {
      console.log(err);
      return res.status(403).json({ err, message: "User not authenticated" });
    }
  });
}

// // Protected route, can only be accessed when user is logged-in
// router.get("/protected", (req, res) => {
//   return res.json({ message: "Protected content!" });
// });
// router.get("/unprotected", (req, res) => {
//   return res.json({ message: "UnProtected content!" });
// });
module.exports = router;
