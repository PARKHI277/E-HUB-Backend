const express = require("express");
const router = new express.Router();
const Internship = require("../schema_details/internshipDetails");
const errorController = require("../controllers/errorController");

router.post("/internship", async (req, res, next) => {
  try {
    const { internPosition, internCompany, internLink } = await req.body;
    const internPexist = await Internship.findOne({ internPosition });
    const internCexist = await Internship.findOne({ internCompany });
    const internLexist = await Internship.findOne({ internLink });

    if (internPexist && internCexist && internLexist) {
      return res
        .status(400)
        .send({ message: "This internship detail already exists." });
    }

    const internship_create = new Internship({
      internPosition,
      internCompany,
      internLink,
    });

    const saveinternship = await internship_create.save();
    res.status(201).send(saveinternship);
  } catch (err) {
    console.log(err);
    errorController(err, req, res, next);
  }
});

router.get("/internship", async (req, res) => {
  try {
    const allinternship = await Internship.find().sort({ "createdAt": -1 });

    res.status(200).send(allinternship);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/internship/:id", async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      return res.status(400).json({
        success: false,
        message: "This Internship id doesn't exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Internship Details got deleted",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
    });
  }
});

module.exports = router;
