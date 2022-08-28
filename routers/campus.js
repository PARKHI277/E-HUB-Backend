const express = require("express");
const router = new express.Router();
const Campus = require("../schema_details/Campus");
const errorController = require("../controllers/errorController");
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
      return res
        .status(200)
        .send({ message: "This Eventname already exists." });
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
    errorController(err, req, res, next);
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

router.patch("/campus/:id", async (req, res) => {
  try {
    await Campus.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    return res.status(400).json({
      success: true,
      message: "Campus Details got updated",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
    });
  }
});

router.delete("/campus/:id", async (req, res) => {
  try {
    await Campus.findByIdAndDelete(req.params.id);
    return res.status(400).json({
      success: true,
      message: "Campus Details got deleted",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
    });
  }
});

module.exports = router;
