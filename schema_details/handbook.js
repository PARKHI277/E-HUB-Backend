require("dotenv").config();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const HandbookSchema = new Schema({
  bookTitle: {
    type: String,
    required: [true, "bookTitle is required"],
  },
  bookTagline: {
    type: String,
    required: [true, "bookTagline is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  pdfUrl: { type: String, required: [true, "pdfUrl is required"] },
  bookimgUrl: {
    type: String,
    required: [true, "bookimgUrl is required"],
  },
  imageUrl: { type: Array },
});

const Handbook = new mongoose.model("Handbook", HandbookSchema);
module.exports = Handbook;
