require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  ResourceTitle: {
    type: String,
    required: true,
  },
  ResourceLink: {
    type: String,
    required: [true, "Resource link is required."],
  },
});

const Resource = new mongoose.model("Resource", ResourceSchema);
module.exports = Resource;
