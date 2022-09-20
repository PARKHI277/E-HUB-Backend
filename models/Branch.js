require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const branchschema = new Schema({
  branch: {
    type: String,
    required: [true, "Enter Branch"],
  }
},{ timestamps: true });

const branchname = new mongoose.model("branch", branchschema);
module.exports = branchname;
