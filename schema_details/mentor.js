require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const MentorSchema = new Schema({
  MentorName: {
    type: String,
    required: true,
    minLength: 6,
  },
  MentorDomain: {
    type: String,
    required: true,
  },
  MentorNumber: {
    type: Number,
    required: true,
    maxLength: 10,
  },
});

const Mentor = new mongoose.model("Domain", MentorSchema);
module.exports = Mentor;
