require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const campusSchema = new Schema({
  collegeName: {
    type: String,
    required: [true, "College Name is requires"],
  },
  collegePhoto: {
    type: Array,
    required: [true, "College Image is requires"],
  },
  eventName: {
    type: String,
    required: [true, "EventName is requires"],
  },
  description: {
    type: String,
    required: [true, "Description is requires"],
  },
  condition: {
    type: String,
  },
  eventType: {
    type: String,
  },
  eventDate: {
    type: Date,
    required: [true, "EventDate is requires"],
  },
  price: {
    type: String,
  },
});

const campusName = new mongoose.model("campus", campusSchema);
module.exports = campusName;
