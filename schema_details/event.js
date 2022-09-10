require("dotenv").config();
const mongoose = require("mongoose");
const validator=require('validator');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  //eventId: {
//   type:Number,
//   unique:true,
//   require:true, 
//   default:0
// },
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
    required: [true,'Enter an event name.'],
    unique:true
  },
  eventCode: {
    type: String,
    unique:true
  },
  description: {
    type: String,
    required: [true,'Enter a description.']
  },
  eventDate: {
    type: Date,
    required: [true,'Enter date and time.']
  },
  position: {
    type: String,
  },
  company: {
    type: String,
  },
  posterUrl: {
    type: String,
    required: [true,'Enter poster url.'],
    unique:true
  },
});

const Event = new mongoose.model("Event", eventSchema);
module.exports = Event;
