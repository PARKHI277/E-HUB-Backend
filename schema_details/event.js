require("dotenv").config();
const mongoose = require("mongoose");
const validator=require('validator');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  mentorName: {
    type: String,
    required: [true,'Enter a mentorName.']
  },
  mentorImage: {
    type: Array,
    required: [true,'Enter a mentorImage.']
  },
  eventName: {
    type: String,
    required: [true,'Enter a eventName.']
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
    required: [true,'Enter a dateTime.']
  },
  position: {
    type: String,
  },
  company: {
    type: String,
  },
  posterUrl: {
    type: String,
    required: [true,'Enter a posterUrl.']
  },
});

const Event = new mongoose.model("Event", eventSchema);
module.exports = Event;
