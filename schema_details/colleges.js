require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const collegeschema = new Schema({
  collegename: {
    type: String,
    required: true,
  },
});

const Collegename = new mongoose.model("college", collegeschema);
module.exports = Collegename;
