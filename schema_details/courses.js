require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const courseschema = new Schema({
  courseName: {
    type: String,
    required: [true, "Please enter Course Name"],
  },
  description: {
    type: String,
    required: [true, "Please enter Course Description Name"],
  },
  lastDate: {
    type: Date,
    required: [true, "Please enter Last Date"],
  },
});

const course = new mongoose.model("course", courseschema);
module.exports = course;
