require("dotenv").config();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
},{ timestamps: true });

const GoogleUser = new mongoose.model("GoogleUser", UserSchema);
module.exports = GoogleUser;
