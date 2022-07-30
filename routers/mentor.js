const express = require("express");
const router = new express.Router();
const Mentor = require("../schema_details/mentor");

router.post("/Mentor", async (req, res, next) => {
  try {
    const { MentorName, MentorDomain, MentorNumber } = await req.body;
    const Mentor_create = new Mentor({
      MentorName,
      MentorDomain,
      MentorNumber,
    });
    const mentor = await Mentor_create.save();
    res.status(201).send(mentor);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// ask your query and O-auth left

module.exports = router;
