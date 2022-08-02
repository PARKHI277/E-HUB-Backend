const express = require("express");
const router = new express.Router();
const Hiring = require("../schema_details/hiring");

router.post("/Hiring", async (req, res, next) => {
  try {
    const { title, description, Lastdate } = await req.body;
    const hiring_create = new Hiring({
      title,
      description,
      Lastdate,
    });
    const savehiring = await hiring_create.save();
    res.status(201).send(savehiring);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
