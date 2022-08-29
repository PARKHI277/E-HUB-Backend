require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const collegeschema = new Schema({
  collegeName: {
    type: String,
    required: [true, "CollegeName is required"],
  },
});

const Collegename = new mongoose.model("college", collegeschema);
module.exports = Collegename;
