require("dotenv").config();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const HandbookSchema = new Schema({
  bookTitle: {
    type: String,
    required: true,
  },
  bookTagline: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  pdfUrl: {
    //////
  },
});

const Handbook = new mongoose.model("Handbook", HandbookSchema);
module.exports = Handbook;
