const express = require("express");
const router = new express.Router();
const Mentor = require("../models/mentor");
const errorController = require("../controllers/errorController");

router.post("/mentor", async (req, res, next) => {
  try {
    const {
      mentorName,
      mentorImage,
      mentorDomain,

      linkedinUrl,
      about,
      position,
    } = await req.body;
    const Mentor_create = new Mentor({
      mentorName,
      mentorImage,
      mentorDomain,

      linkedinUrl,
      about,
      position,
    });
    const mentor = await Mentor_create.save();
    res.status(201).send(mentor);
  } catch (err) {
    console.log(err);
    errorController(err, req, res, next);
    res.status(400).send(err);
  }
});
router.get("/mentor", async (req, res) => {
  try {
    const allmentors = await Mentor.find().sort({ createdAt: -1 });

    res.status(200).send(allmentors);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/mentor/:id", async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!mentor) {
      return res.status(400).json({
        success: false,
        message: "This mentor id doesn't exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Mentor Details got deleted",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
    });
  }
});

module.exports = router;
