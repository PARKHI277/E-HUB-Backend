require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const campusSchema = new Schema({
  collegeName: {
    type: String,
    required: [true, "collegeName is requires"],
  },
  collegePhoto: {
    type: Array,
    required: [true, "collegePhoto is requires"],
  },
  eventName: {
    type: String,
    required: [true, "eventName is requires"],
  },
  description: {
    type: String,
    required: [true, "description is requires"],
  },
  condition: {
    type: String,
  },
  eventType: {
    type: String,
  },
  eventDate: {
    type: Date,
    required: [true, "eventDate is requires"],
  },
  price: {
    type: String,
  },
});

const campusName = new mongoose.model("campus", campusSchema);
module.exports = campusName;
