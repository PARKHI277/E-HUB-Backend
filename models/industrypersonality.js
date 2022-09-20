require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const industrySchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Achievement: {
    type: String,
    required: true,
  },
  Domain: {
    type: String,
    required: true,
  },
  Package: {
    type: Number,
    required: true,
  },
},{ timestamps: true });

const industry = new mongoose.model("industry", industrySchema);
module.exports = industry;
