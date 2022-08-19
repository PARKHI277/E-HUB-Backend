const express = require("express");
const router = new express.Router();
const Mentor = require("../schema_details/mentor");

router.post("/Mentor", async (req, res, next) => {
  try {
    const { mentorName, mentorDomain, mentorNumber } = await req.body;
    const Mentor_create = new Mentor({
      mentorName,
      mentorDomain,
      mentorNumber,
    });
    const mentor = await Mentor_create.save();
    res.status(201).send(mentor);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});
router.get("/mentor", async (req, res) => {
  try {
    const allmentors = await Mentor.find();

    res.status(200).send(allmentors);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ask your query and O-auth left

module.exports = router;
