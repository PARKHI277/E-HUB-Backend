require("dotenv").config();
const mongoose = require("mongoose");

const campusActivitySchema = new mongoose.Schema({
  
    // schema yet to decide
    
});

const CampusActivity = new mongoose.model("Activity", campusActivitySchema);
module.exports = CampusActivity;
