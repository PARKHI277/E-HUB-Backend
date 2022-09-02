require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;
const domainSchema = new Schema({
  domain: {
    type: String,
    required: [true, "Domain Name is required"],
  },
});

const domainName = new mongoose.model("domain", domainSchema);
module.exports = domainName;
