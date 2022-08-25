const express = require("express");
const router = new express.Router();
const Campus = require("../schema_details/Campus");

// admin side
router.post("/campus", async (req, res) => {
  try {
    const {
      collegeName,
      collegePhoto,
      eventName,
      description,
      condition,
      eventType,
      eventDate,
      price,
    } = await req.body;
    const eventexixt = await Campus.findOne({ eventName });

    if (eventexixt) {
      return res.status(200).send({ message: "This Event already exists." });
    }

    const campus_create = new Campus({
      collegeName,
      collegePhoto,
      eventName,
      description,
      condition,
      eventType,
      eventDate,
      price,
    });

    const saveCampus = await campus_create.save();
    res.status(201).send(saveCampus);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// user side
router.get("/campus", async (req, res) => {
  try {
    const allcampus = await Campus.find();

    res.status(200).send(allcampus);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
