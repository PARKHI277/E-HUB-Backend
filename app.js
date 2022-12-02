require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./connection/data");
const cookieparser = require("cookie-parser");
const signupRouter = require("./router/signup");
const loginRouter = require("./router/login");
const googleloginRouter = require("./router/googlelogin");
const BodyParser = require("body-parser");
const handbookRouter = require("./router/handbook");
const eventRouter = require("./router/event");
const resourceRouter = require("./router/resource");
const mentorRouter = require("./router/mentor");
const hiringRouter = require("./router/hiring");
const industryRouter = require("./router/industrypersonality");
const internshipRouter = require("./router/internship");
const youtubeRouter = require("./router/youtubeid");
const campusRouter = require("./router/campus");
const collegeRouter = require("./router/college");
const teamRouter = require("./router/team");
const testimonialRouter = require("./router/testimonial");
const branchRouter = require("./router/Branch");
const courseRouter = require("./router/courses");
const instaRouter = require("./router/instagram");
const queryRouter = require("./router/query");
const domainRouter = require("./router/domain");
const passport = require("passport");
const session = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/errorController");

const app = express();
require("./config/gauth")(passport);
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
app.use("/api", googleloginRouter);
app.use("/api/v1", signupRouter);
app.use("/api/v1", loginRouter);
app.use("/api/v1", eventRouter);
app.use("/api/v1", resourceRouter);
app.use("/api/v1", mentorRouter);
app.use("/api/v1", hiringRouter);
app.use("/api/v1", industryRouter);
app.use("/api/v1", internshipRouter);
app.use("/api/v1", handbookRouter);
app.use("/api/v1", collegeRouter);
app.use("/api/v1", teamRouter);
app.use("/api/v1", testimonialRouter);
app.use("/api/v1", branchRouter);
app.use("/api/v1", youtubeRouter);
app.use("/api/v1", campusRouter);
app.use("/api/v1", domainRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", instaRouter);
app.use("/api/v1", queryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
