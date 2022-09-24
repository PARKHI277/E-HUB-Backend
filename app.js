require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./connection/data");
const cookieparser = require("cookie-parser");
const SignupRouter = require("./router/signup");
const LoginRouter = require("./router/login");
const BodyParser = require("body-parser");
const handbookrouter = require("./router/handbook");
const eventRouter = require("./router/event");
const resourcerouter = require("./router/resource");
const mentorrouter = require("./router/mentor");
const hiringrouter = require("./router/hiring");
const industryrouter = require("./router/industrypersonality");
const internshipRouter = require("./router/internship");
const youtube = require("./router/youtubeid");
const campusactivity = require("./router/campus");
const collegerouter = require("./router/college");
const teamrouter = require("./router/team");
const testimonialRouter = require("./router/testimonial");
const branchrouter = require("./router/Branch");
const courserouter = require("./router/courses");
const instarouter = require("./router/instagram");
const passport = require("passport");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/errorController");
const domainrouter = require("./router/domain");

const app = express();
require("./config/passport")(passport);
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(errorController);
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

//router
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
app.use("/api/v1", testimonialRouter);
app.use("/api/v1", branchrouter);
app.use("/api/v1", youtube);
app.use("/api/v1", campusactivity);
app.use("/api/v1", domainrouter);
app.use("/api/v1", courserouter);
app.use("/api/v1", instarouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
