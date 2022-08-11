require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Position: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Contactno: {
    type: Number,
    required: true,
    maxlength: 10,
    minlength: 10,
  },
});

const Team = new mongoose.model("Team", TeamSchema);
module.exports = Team;
