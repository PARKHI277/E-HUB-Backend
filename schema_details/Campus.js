require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const campusSchema = new Schema({
  collegeName: {
    type: String,
    required: true,
  },
  collegePhoto: {
    type: Array,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
  },
  eventType: {
    type: String,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  price: {
    type: String,
  },
});

const campusName = new mongoose.model("campus", campusSchema);
module.exports = campusName;
