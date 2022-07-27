const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Parkhi:Parkhi123@cluster0.gmmfk.mongodb.net/E-Hubdata",
  { useNewUrlParser: true },
  () => console.log("Successfully connected to mongodb database")
);
