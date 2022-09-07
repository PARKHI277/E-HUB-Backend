const express = require("express");
const router = new express.Router();
const Testimonial = require("../schema_details/testimonial");
const errorController = require("../controllers/errorController");

router.post("/testimonial", async (req, res, next) => {
  try {
    const {name,
      profileImage,
      description,
      eventDate
    } = await req.body;
    // if (
    //   !mentorName &&
    //   !mentorImage &&
    //   !eventName &&
    //   !description &&
    //   !eventDate &&
    //   !posterUrl
    // )
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please fill all the fields",
    //   });
  //  if(!eventDate.validateSync())
  //  return res.status(400).json({
  //   success: false,
  //   message: "Enter a valid date",
  // });
    const testimonial_create = new Testimonial({
        name,
        profileImage,
        description,
        eventDate
    });
    const saveTestimonial = await testimonial_create.save();
    res.status(201).send(saveTestimonial);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

router.get("/testimonial", async (req, res) => {
  try {
    const allTestimonials = await Testimonial.find();

    res.status(200).send(allTestimonials);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
});

router.patch("/testimonial/:id", async (req, res) => {
  try {const {name,
    profileImage,
    description,
    eventDate
  } = await req.body;
    if (
      !(  name||
        profileImage||
        description||
        eventDate)
    )
      return res.status(400).json({
        success: false,
        message: "Please fill atleast one field.",
      });

  Testimonial.findById(req.params.id, function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          if(docs==null)
          return res.status(400).json({
            success: false,
            message: "Id does not exist",
          });
          Testimonial.findByIdAndUpdate(
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
                  message: "Testimonial got updated",
                });
              }
            }
          );
      }
  });
 
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Enter fields"
    });
  }
});

router.delete("/testimonial/:id", async (req, res) => {
  try {
    const testimonial= await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(400).json({
        success: false,
        message: "This id doesn't exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Testimonial details got deleted",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
    });
  }
});
module.exports = router;
