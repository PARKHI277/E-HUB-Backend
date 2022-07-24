const express = require("express");
const router = new express.Router();
const User = require("../schema_details/userdetails");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const user = await User.findOne({ Email: req.body.Email });
  if (!user)
    return res.status(400).send({ msg: "This email is not registred" });

  // password is correct or not
  const validpass = await bcrypt.compare(req.body.Password, user.Password);

  if (!validpass) {
    return res.status(400).send({ msg: "wrong password" });
  } else {
    res.status(200).send({ msg: "Login Sucess", user: user._id });
  }
});

module.exports = router;
