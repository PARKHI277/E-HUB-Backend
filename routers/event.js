const express = require("express");
const router = new express.Router();
const Event = require("../schema_details/event");
function truncate(str, no_words) {
  return str.split(" ").splice(5,no_words).join(" ");
}



router.post("/event", async (req, res, next) => {
  try {
    const { mentorName, mentorImage, eventName, eventCode, description, dateTime,position,company,posterUrl } =
      await req.body;
    const event_create = new Event({
        mentorName,
        mentorImage,
        eventName,
        eventCode,
        description,
        dateTime,
        position,
        company,
        posterUrl
    });
    const saveEvent = await event_create.save();
    res.status(201).send(saveEvent);
  } catch (err) {if (err.code === 11000) {
    message = err.message;
 //  message = "Mobile number already exists";
   console.log(message);
 }
    if (err.name === "ValidationError")
        message=err.message;

      if (err.name === "CastError") message = err.message;
      if (err.name === "EmptyError") message = err.message;
      return res.status(400).json({
        success: false,
        message:truncate(message,8)
    });
  }
});

router.get("/event", async (req, res) => {
  try {
    const allEvents = await Event.find();

    res.status(200).send(allEvents);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/event/:id", async (req, res) => {
  try {
   await Event.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    return res.status(400).json({
      success: true,
      message:"Event got updated"
    });
  } catch (err) { return res.status(400).json({
    success: false
  });
  }
});

router.delete("/event/:id", async (req, res) => {
  try {
   await Event.findByIdAndDelete(req.params.id);
    return res.status(400).json({
      success: true,
      message:"Event got deleted"
    });
  } catch (err) { return res.status(400).json({
    success: false
  });
  }
});
module.exports = router;
