require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");
const Schema = mongoose.Schema;

const youtubeSchema = new Schema({
  videoId: {
    type: String,
  },
  publishedAt: {
    type: String,
  },
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  thumbnails: {
    type: Array,
  },
  channelTitle: {
    type: String,
  },
},{ timestamps: true });

const youtubeName = new mongoose.model("youtube", youtubeSchema);
module.exports = youtubeName;
