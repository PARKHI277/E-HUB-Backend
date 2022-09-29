require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const querySchema = new Schema(
  {
    query: {
      type: Array,
      "url": { type: String },
      "domain": { type: String },
      required: [true, "Enter Query"],
    },
  },
  { timestamps: true }
);

const query = new mongoose.model("query", querySchema);
module.exports = query;
