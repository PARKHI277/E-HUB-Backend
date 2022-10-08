require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Team member Name is required"],
    },
    position: {
      type: String,
      required: [true, "Team member Position is required"],
    },
    image: {
      type: String,
      required: [true, "Team member Image is required"],
    },
    description: {
      type: String,
      required: [true, "Team member Description is required"],
    },
    linkedinUrl: {
      type: String,
      required: [true, "Team member Linkedin Url is required"],
    },
  },
  { timestamps: true }
);

const Team = new mongoose.model("Team", TeamSchema);
module.exports = Team;
