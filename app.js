require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./connection/data");
const SignupRouter = require("./routers/signup");
const LoginRouter = require("./routers/login");

const internshipRouter = require("./routers/internship");
const magazineRouter = require("./routers/magazine");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTION,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Hi,the API is working.");
});

//middlewares
app.use(express.json());

//routers
app.use("/api/users", SignupRouter);
app.use("/api/users", LoginRouter);

app.use("/api/admin", internshipRouter);
app.use("/api/admin", magazineRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`connection succesful  at port ${port}`);
});
