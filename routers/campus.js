const express = require("express");
const router = new express.Router();
const Campus = require("../schema_details/Campus");
const errorController = require("../controllers/errorController");
const date = require("../services/date");

// admin side
router.post("/campus", async (req, res, next) => {
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
    let validDate= date(eventDate);
     if(!validDate)
     return res.status(400).json({
      success: false,
      message: "Enter a valid date",
      });
    const eventexist = await Campus.findOne({ eventName });

    if (eventexist) {
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
    if (
      !collegeName ||
      !collegePhoto ||
      !eventName ||
      !description ||
      !condition ||
      !eventType ||
      !eventDate ||
      !price
    )
      return res.status(400).json({
        success: false,
        message: "Please fill atleast one field.",
      });

    Campus.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            success: true,
            message: "Campus Details got updated ",
          });
        }
      }
    );
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Enter fields to update ",
    });
  }
});

router.delete("/campus/:id", async (req, res) => {
  try {
    const campus = await Campus.findByIdAndDelete(req.params.id);
    if (!campus) {
      return res.status(400).json({
        success: false,
        message: "This campus id doesn't exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Campus Details got deleted",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Please enter valid id",
    });
  }
});

module.exports = router;
