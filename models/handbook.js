require("dotenv").config();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const HandbookSchema = new Schema({
  bookTitle: {
    type: String,
    required: [true, "Book Title is required"],
  },
  bookTagline: {
    type: String,
    required: [true, "Book Tagline is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  pdfUrl: { type: String, required: [true, "Pdf Url is required"] },
  bookimgUrl: {
    type: String,
    required: [true, "Booking Url is required"],
  },
  imageUrl: { type: Array }
},{ timestamps: true });

const Handbook = new mongoose.model("Handbook", HandbookSchema);
module.exports = Handbook;
