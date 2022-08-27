require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./connection/data");
const cookieparser = require("cookie-parser");
const SignupRouter = require("./routers/signup");
const LoginRouter = require("./routers/login");
const BodyParser = require("body-parser");
const handbookrouter = require("./routers/handbook");
const eventRouter = require("./routers/event");
const resourcerouter = require("./routers/resource");
const mentorrouter = require("./routers/mentor");
const hiringrouter = require("./routers/hiring");
const industryrouter = require("./routers/industrypersonality");
const internshipRouter = require("./routers/internship");
const youtube = require("./routers/youtubeid");
const campusactivity = require("./routers/campus");
const collegerouter = require("./routers/college");
const teamrouter = require("./routers/team");
const branchrouter = require("./routers/Branch");
const passport = require("passport");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const domainrouter = require("./routers/domain");

const app = express();
require("./config/passport")(passport);
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

// SESSION MIDDLEWARE
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    // store: new MongoDBStore({
    //   url: process.env.MONGOLAB_URI,
    // }),
    //cookie: { secure: true }
  })
);
// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/api/v1", SignupRouter);
app.use("/api/v1", LoginRouter);
app.use("/api/v1", eventRouter);
app.use("/api/v1", resourcerouter);
app.use("/api/v1", mentorrouter);
app.use("/api/v1", hiringrouter);
app.use("/api/v1", industryrouter);
app.use("/api/v1", internshipRouter);
app.use("/api/v1", handbookrouter);
app.use("/api/v1", collegerouter);
app.use("/api/v1", teamrouter);
app.use("/api/v1", branchrouter);
app.use("/api/v1", youtube);
app.use("/api/v1", campusactivity);
app.use("/api/v1", domainrouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
