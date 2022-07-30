require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const handbookSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
});

const Handbook = new mongoose.model("Handbook", handbookSchema);
module.exports = Handbook;
