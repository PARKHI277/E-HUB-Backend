require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter Title"],
    },
    about: {
      type:String,
      required: [true, "Please enter about course"],
    },
    features: {
      type: Array,
      required: [true, "Please enter features of the course"],
    },
    posterUrl: {
      type: String,
      required: [true, "Enter poster url."],
      unique: true,
    },
    imageUrl: {
      type: Array
    },
    mentorName: {
      type: String,
      required: [true, "Enter a mentor name."],
    },
    mentorImage: {
      type: Array,
      required: [true, "Enter a mentor image."],
    },
    position: {
      type: String
    },
    company: {
      type: String
    },
    syllabus:{type:Array,
      "day":{type:Number},
    "title":{type:String},
  "description":{type:String},
"url":{type:String},
required: [true, "Enter syllabus"]
}
    
  },
  { timestamps: true }
);

const course = new mongoose.model("course", courseSchema);
module.exports = course;
