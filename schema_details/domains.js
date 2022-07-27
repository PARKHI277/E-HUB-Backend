require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const DomainSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  ResourceTitle: {
    type: String,
    required: true,
  },
  ResourceLink: {
    type: String,
    required: [true, "Resource link is required."],
  },
  MentorName: {
    type: String,
    required: true,
    minLength: 6,
  },
  MentorDomain: {
    type: String,
    required: true,
  },
  MentorNumber: {
    type: Number,
    required: true,
    max: 10,
  },
});

const Domain = new mongoose.model("Domain", DomainSchema);
module.exports = Domain;
