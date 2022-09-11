require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const campusSchema = new Schema(
  {
    collegeName: {
      type: String,
      required: [true, "College Name is required"],
    },
    collegePhoto: {
      type: Array,
      required: [true, "College Image is required"],
    },
    eventName: {
      type: String,
      required: [true, "Event Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    condition: {
      type: String,
    },
    eventType: {
      type: String,
    },
    eventDate: {
      type: Date,
      required: [true, "Event Date is required"],
    },
    price: {
      type: String,
    },
    websiteUrl: {
      type: Array,
      required: [true, "Website Url is required"],
    },
  },
  { timestamps: true }
);

const campusName = new mongoose.model("campus", campusSchema);
module.exports = campusName;
