const express = require("express");
const router = new express.Router();
const Course = require("../schema_details/courses");
const errorController = require("../controllers/errorController");
// admin side
router.post("/course", async (req, res, next) => {
  try {
    const { courseName, description, lastDate } = await req.body;

    if (!courseName && !description && !lastDate) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const courseExist = await Course.findOne({ courseName });

    if (courseExist) {
      return res.status(200).send({ message: "This Course already exists." });
    }

    const course_create = new Course({
      courseName,
      description,
      lastDate,
    });
    // course_create.lastDate instanceof Date;
    // course_create.validateSync().errors["lastDate"]; // CastError

    const savecourse = await course_create.save();
    res.status(201).send(savecourse);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

router.get("/course", async (req, res, nexr) => {
  try {
    const allCourses = await Course.find();

    res.status(200).send(allCourses);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
});

router.patch("/course/:id", async (req, res) => {
  try {
    if (!courseName || !description || !lastDate)
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
        message: "This course id doesn't exixt",
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
