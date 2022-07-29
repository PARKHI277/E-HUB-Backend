require("dotenv").config();
const mongoose = require("mongoose");

const magazineSchema = new mongoose.Schema({
  
  topic: { type: String, required: true},
  body: { type: String, required: true}

});

const Magazine = new mongoose.model("Magazine", magazineSchema);
module.exports = Magazine;
