const express = require("express");
const router = new express.Router();
const Team = require("../schema_details/team");

// admin
router.post("/admin/team", async (req, res, next) => {
  try {
    const { Name, Position, Description, Contactno } = await req.body;
    const team_create = new Team({
      Name,
      Position,
      Description,
      Contactno,
    });
    const saveteam = await team_create.save();
    res.status(201).send(saveteam);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// user side to get

router.get("/user/team", async (req, res) => {
  try {
    const allteams = await Team.find();

    res.status(200).send(allteams);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
