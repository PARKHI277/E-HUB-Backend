const express = require("express");
const router = new express.Router();
const User = require("../schema_details/userdetails");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Email,
      Institution,
      ContactNum,
      Password,
      ConfirmPassword,
    } = await req.body;
    const userExist = await User.findOne({ Email });

    if (userExist) {
      return res.status(200).send({ msg: "User already exists." });
    }
    const password = req.body.Password;

    const strongPasswords =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (strongPasswords.test(password)) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const hashconfirm = await bcrypt.hash(ConfirmPassword, salt);
      const user_create = new User({
        FirstName,
        LastName,
        Institution,
        Email,
        ContactNum,
        Password: hashPassword,
        ConfirmPassword: hashconfirm,
      });
      if (hashPassword == hashconfirm) {
        const saveUser = await user_create.save();
        res.status(201).send(saveUser);
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

module.exports = router;
