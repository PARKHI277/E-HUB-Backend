const express = require("express");
const router = new express.Router();
const Course = require("../models/courses");
const errorController = require("../controllers/errorController");
const date = require("../services/date");

// admin side
router.post("/course", async (req, res, next) => {
  try {
    const { title,about,features,posterUrl,  imageUrl,
      mentorName, mentorImage, position, company, syllabus } = await req.body;

    if (!title && !about && !features && !posterUrl && !mentorName && !mentorImage &&  !syllabus) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
  
    const courseExist = await Course.findOne({ title });

    if (courseExist) {
      return res.status(200).send({ message: "This Course already exists." });
    }

    const courseCreate = new Course({
      title,about,features,posterUrl,  imageUrl,
      mentorName, mentorImage, position, company, syllabus
    });
    // courseCreate.lastDate instanceof Date;
    // courseCreate.validateSync().errors["lastDate"]; // CastError

    const savecourse = await courseCreate.save();
    res.status(201).send(savecourse);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

router.get("/course", async (req, res, nexr) => {
  try {
    const allCourses = await Course.find().sort({ createdAt: -1 });

    res.status(200).send(allCourses);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
});


router.get("/course/:id", async (req, res,next) => {
  try {
    
    const courseFound = await Course.findById(req.params.id);
if(!courseFound)
return res.status(400).json({
  success: false,
  message: "Id not found",
});
    res.status(200).send(courseFound);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

router.patch("/course/:id", async (req, res) => {
  try {
    const { title,about,features,posterUrl,  imageUrl,
      mentorName, mentorImage,  position, company, syllabus } = await req.body;
   if (!(title || about || features|| posterUrl || mentorName || mentorImage || syllabus || imageUrl || position || company))
   return res.status(400).json({
    success: false,
    message: "Please fill atleast one field.",
    });

    Course.findByIdAndUpdate(
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
            message: "Course got updated",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Enter fields",
    });
  }
});

router.delete("/course/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "This course id doesn't exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Course Details got deleted",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
    });
  }
});
module.exports = router;
