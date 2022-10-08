const express = require("express");
const router = new express.Router();
const Team = require("../models/team");

// admin
router.post("/team", async (req, res, next) => {
  try {
    const { name, position, description, image, linkedinUrl } = await req.body;
    const team_create = new Team({
      name,
      position,
      description,
      linkedinUrl,
      image,
    });
    const saveteam = await team_create.save();
    res.status(201).send(saveteam);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// user side to get

router.get("/team", async (req, res) => {
  try {
    const allteams = await Team.find().sort({ createdAt: -1 });

    res.status(200).send(allteams);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
