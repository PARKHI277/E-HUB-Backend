require("dotenv").config();
const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  internPosition: {
    type: String,
    required: [true, "Intern Position is required"],
  },
  internCompany: {
    type: String,
    required: [true, "Intern Company is required"],
  },
  internLink: {
    type: String,
    required: [true, "Intern Link is required"],
  },
},{ timestamps: true });

const Internship = new mongoose.model("Internship", internshipSchema);
module.exports = Internship;
