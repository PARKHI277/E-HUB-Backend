const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.gmmfk.mongodb.net/${process.env.DB}`,
  { useNewUrlParser: true },
  () => console.log("Successfully connected to mongodb database")
);
