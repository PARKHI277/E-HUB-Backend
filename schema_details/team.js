require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    maxlength: 10,
    minlength: 10,
  },
});

const Team = new mongoose.model("Team", TeamSchema);
module.exports = Team;
