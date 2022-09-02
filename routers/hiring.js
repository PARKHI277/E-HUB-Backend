const express = require("express");
const router = new express.Router();
const Hiring = require("../schema_details/hiring");
const errorController = require("../controllers/errorController");

router.post("/hiring", async (req, res, next) => {
  try {
    const { position, description, location, lastDate } = await req.body;
    const hiring_create = new Hiring({
      position,
      location,
      description,
      lastDate,
    });
    const savehiring = await hiring_create.save();
    res.status(201).send(savehiring);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

router.get("/hiring", async (req, res) => {
  try {
    const hiringdetail = await Hiring.find();

    res.status(200).send(hiringdetail);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
