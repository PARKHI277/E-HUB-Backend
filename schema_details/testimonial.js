require("dotenv").config();
const mongoose = require("mongoose");
const validator=require('validator');
const Schema = mongoose.Schema;
const testimonialSchema = new Schema({

  name: {
    type: String,
    required: [true,'Enter a name.']
  },
  profileImage: {
    type: Array,
    required: [true,'Enter a profile image.']
  },
  description: {
    type: String,
    required: [true,'Enter a description.']
  },
  eventDate: {
    type: Date,
    required: [true,'Enter date and time.']
  }
},{ timestamps: true });

const Testimonial = new mongoose.model("Testimonial",testimonialSchema);
module.exports =Testimonial;
