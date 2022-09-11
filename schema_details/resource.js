require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  resourceName: {
    type: String,
    required: [true, "Resource Name is required"],
  },
  resourceLink: {
    type: String,
    required: [true, "Resource link is required."],
  },
},{ timestamps: true });

const Resource = new mongoose.model("Resource", ResourceSchema);
module.exports = Resource;
