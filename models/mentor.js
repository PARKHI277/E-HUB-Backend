require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const MentorSchema = new Schema(
  {
    mentorName: {
      type: String,
      required: [true, "Mentor Name is required"],
      minLength: 6,
    },
    mentorDomain: {
      type: String,
      required: [true, "Mentor Domain is required"],
    },
    mentorNumber: {
      type: Number,
      required: [true, "Mentor Number is required"],
      maxLength: 10,
      minLength: 10,
    },
    position: {
      type: String,
      required: [true, "Mentor Position is required"],
    },
    about: {
      type: String,
      required: [true, "Mentor Description is required"],
    },
    linkedinUrl: {
      type: String,
      required: [true, "Mentor Linkedin Url is required"],
    },
  },
  { timestamps: true }
);

const Mentor = new mongoose.model("Domain", MentorSchema);
module.exports = Mentor;
