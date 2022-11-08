require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");
const Schema = mongoose.Schema;

const InstagramSchema = new Schema(
  {
    url: {
      type: String,
      unique: true,
    },
    imageUrl: {
      type: Array,
      required: [true, "Image url is required."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
  },
  { timestamps: true }
);

const Instagram = new mongoose.model("Instagram", InstagramSchema);
module.exports = Instagram;
