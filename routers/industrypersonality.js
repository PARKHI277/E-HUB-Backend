const express = require("express");
const router = new express.Router();
const industry = require("../models/industrypersonality");

router.post("/industry", async (req, res, next) => {
  try {
    const { Name, Achievement, Domain, Package } = await req.body;
    const industry_create = new industry({
      Name,
      Achievement,
      Domain,
      Package,
    });
    const saveindustry = await industry_create.save();
    res.status(201).send(saveindustry);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
