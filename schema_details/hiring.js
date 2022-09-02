require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const hiringSchema = new Schema({
  position: {
    type: String,
    required: [true, "Position field is required"],
  },
  location: {
    type: String,
    required: [true, "Location field is required"],
  },
  description: {
    type: String,
    required: [true, "Job Description is required"],
  },
  lastDate: {
    type: Date,
    required: [true, "Last Date is required"],
  },
  experience: {
    type: String,
    required: [true, "Experience field is requires"],
  },
  eligibility: {
    type: String,
    required: [true, "Eligibility is required"],
  },
  techStack: {
    type: String,
    required: [true, "Tech stack is requires"],
  },
});

const Hiring = new mongoose.model("Hiring", hiringSchema);
module.exports = Hiring;
