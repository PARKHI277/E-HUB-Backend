require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const hiringSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Lastdate: {
    type: String,
    required: true,
  },
});

const Hiring = new mongoose.model("Hiring", hiringSchema);
module.exports = Hiring;
