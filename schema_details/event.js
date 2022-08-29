require("dotenv").config();
const mongoose = require("mongoose");
const validator=require('validator');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  mentorName: {
    type: String,
    required: [true,'Enter a mentor name.']
  },
  mentorImage: {
    type: Array,
    required: [true,'Enter a mentor image.']
  },
  eventName: {
    type: String,
    required: [true,'Enter a event name.']
  },
  eventCode: {
    type: String
  },
  description: {
    type: String,
    required: [true,'Enter a description.']
  },
  dateTime: {
    type: Date,
    required: [true,'Enter a date and time.']
  },
  position: {
    type: String,
  },
  company: {
    type: String,
  },
  posterUrl: {
    type: String,
    required: [true,'Enter poster url.']
  },
});

const Event = new mongoose.model("Event", eventSchema);
module.exports = Event;
