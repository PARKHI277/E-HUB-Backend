const express = require("express");
const router = new express.Router();
const Event = require("../models/event");
const errorController = require("../controllers/errorController");
const date = require("../services/date");

router.post("/event", async (req, res, next) => {
  try {
    const {
      mentorName,
      mentorImage,
      eventName,
      // eventCode,
      description,
      eventDate,
      position,
      company,
      posterUrl,
      tagline,
    } = await req.body;
    if (
      !mentorName &&
      !mentorImage &&
      !eventName &&
      !description &&
      !eventDate &&
      !posterUrl
    )
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    let validDate = date(eventDate);
    if (validDate===false)
      return res.status(400).json({
        success: false,
        message: "Enter a valid date",
      });
    const event_create = new Event({
      mentorName,
      mentorImage,
      eventName,
      // eventCode,
      description,
      eventDate,
      position,
      company,
      posterUrl,
      tagline,
    });
    const saveEvent = await event_create.save();
    res.status(201).send(saveEvent);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

router.get("/event", async (req, res) => {
  try {
    const allEvents = await Event.find().sort({ createdAt: -1 });

    res.status(200).send(allEvents);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
});

router.patch("/event/:id", async (req, res) => {
  try {
    const {
      mentorName,
      mentorImage,
      eventName,
      eventCode,
      description,
      eventDate,
      position,
      company,
      posterUrl,
      tagline,
    } = await req.body;
    if (
      !(
        mentorName ||
        mentorImage ||
        eventName ||
        eventCode ||
        description ||
        eventDate ||
        position ||
        company ||
        posterUrl
      )
    )
      return res.status(400).json({
        success: false,
        message: "Please fill atleast one field.",
      });

    Event.findById(req.params.id, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if (docs == null)
          return res.status(400).json({
            success: false,
            message: "Id does not exist",
          });
        Event.findByIdAndUpdate(
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
                message: "Event got updated",
              });
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Enter fields",
    });
  }
});

router.delete("/event/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "This event id doesn't exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Event Details got deleted",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
    });
  }
});

// updating event code

router.patch("/eventcode/:id", async (req, res) => {
  try {
    const eventcode = req.body.eventCode;
    if (!eventcode) {
      res.status(400).json({
        success: false,
        message: "Please add event Code to update",
      });
    }
    Event.findById(req.params.id, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if (docs == null)
          return res.status(400).json({
            success: false,
            message: "Id does not exist",
          });
        Event.findByIdAndUpdate(
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
                message: "Event got updated",
              });
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Enter fields",
    });
  }
});

module.exports = router;
