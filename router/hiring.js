const express = require("express");
const router = new express.Router();
const Hiring = require("../models/hiring");
const errorController = require("../controllers/errorController");
const date = require("../services/date");

router.post("/hiring", async (req, res, next) => {
  try {
    const {
      position,
      description,
      location,
      lastDate,
      experience,
      eligibility,
      techStack,
    } = await req.body;
    let validDate = date(lastDate);
    if (!validDate)
      return res.status(400).json({
        success: false,
        message: "Enter a valid date",
      });
    const hiring_create = new Hiring({
      position,
      location,
      description,
      lastDate,
      experience,
      eligibility,
      techStack,
    });
    const savehiring = await hiring_create.save();
    res.status(201).send(savehiring);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

router.get("/hiring", async (req, res) => {
  try {
    const hiringdetail = await Hiring.find().sort({ createdAt: -1 });

    res.status(200).send(hiringdetail);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
});


router.get("/hiring/:id", async (req, res,next) => {
  try {
    
    const detailFound = await Hiring.findById(req.params.id);
if(!detailFound)
return res.status(400).json({
  success: false,
  message: "Id not found",
});
    res.status(200).send(detailFound);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

module.exports = router;
