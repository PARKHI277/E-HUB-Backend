require("dotenv").config();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const eventSchema = new Schema({
  mentorName: {
    type: String,
    required: true,
  },
  mentorImage: {
    type: Array,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventCode: {
    type: String
  },
  description: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  position: {
    type: String,
  },
  company: {
    type: String,
  },
  posterUrl: {
    type: String,
    required: true
  },
});

const Event = new mongoose.model("Event", eventSchema);
module.exports = Event;
