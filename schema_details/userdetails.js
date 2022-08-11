require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  FirstName: { type: String, required: true, minlength: 3 },
  LastName: { type: String, required: true, minlength: 3 },
  Institution: { type: String },
  Email: { type: String, required: true, unique: true },
  ContactNum: {
    type: Number,
    required: true,
    maxlength: 10,
    minlength: 10,
    unique: true,
  },
  Password: { type: String, required: true },
  ConfirmPassword: { type: String, required: true },
});

const User = new mongoose.model("User", UserSchema);
module.exports = User;
