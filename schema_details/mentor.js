require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const MentorSchema = new Schema({
  mentorName: {
    type: String,
    required: true,
    minLength: 6,
  },
  mentorDomain: {
    type: String,
    required: true,
  },
  mentorNumber: {
    type: String,
    required: true,
    maxLength: 10,
    minLength: 10,
  },
});

const Mentor = new mongoose.model("Domain", MentorSchema);
module.exports = Mentor;
