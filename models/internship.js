require("dotenv").config();
const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    internPosition: {
      type: String,
      required: [true, "Intern Position is required"],
    },
    internCompany: {
      type: String,
      required: [true, "Intern Company is required"],
    },
    applyUrl: {
      type: String,
      required: [true, "Intern Link is required"],
    },
    description: {
      type: String,
      required: [true, "Internship description is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    type: {
      type: String,
      required: [true, "Internship Type is required"],
    },
    timing: {
      type: String,
      required: [true, "Timing(Full-time / Part-time) required"],
    },
  },
  { timestamps: true }
);

const Internship = new mongoose.model("Internship", internshipSchema);
module.exports = Internship;
