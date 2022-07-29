require("dotenv").config();
const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({

  company: { type: String, required: true, minlength: 3 },
  batch: { type: String, required: true, minlength: 3 },
  location: { type: String, required: true, minlength: 3 },
  link: { type: String, required: true, minlength: 3 },
  package: { type: String, required: true, minlength: 3 },

});

const Internship = new mongoose.model("Internship", internshipSchema);
module.exports = Internship;
