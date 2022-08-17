require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // FirstName: { type: String, required: true, minlength: 3 },
  userName: { type: String, required: true, minlength: 3 },
  // LastName: { type: String, required: true, minlength: 3 },
  institutionName: { type: String },
  branch: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: {
    type: Number,
    required: true,
    maxlength: 10,
    minlength: 10,
    unique: true,
  },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.generateAcessToken = async function (req, res, next) {
  try {
    const pay_load = { _id: this._id };
    const options = {
      expiresIn: "2d",
    };
    const acesstoken = jwt.sign(
      pay_load,
      options,

      process.env.TOKEN_SECRET_KEY
    );
    return acesstoken;
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
// UserSchema.methods.generaterefreshToken = async function () {
//   try {
//     const pay_load = { _id: this._id };
//     const options = {
//       expiresIn: "1y",
//     };
//     const refreshtoken = jwt.sign(
//       pay_load,
//       options,
//       process.env.TOKEN_SECRET_KEYS
//     );
//     return refreshtoken;
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };

const User = new mongoose.model("User", UserSchema);
module.exports = User;
