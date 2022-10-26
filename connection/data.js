const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () =>
  console.log("Successfully connected to mongodb database")
);
