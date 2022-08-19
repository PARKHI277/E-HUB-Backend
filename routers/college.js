const express = require("express");
const router = new express.Router();
const College = require("../schema_details/colleges");

// admin side
router.post("/college", async (req, res) => {
  try {
    const { collegeName } = await req.body;
    const collegeExist = await College.findOne({ collegeName });

    if (collegeExist) {
      return res.status(200).send({ msg: "college already exists." });
    }

    const college_create = new College({
      collegeName,
    });

    const savecollege = await college_create.save();
    res.status(201).send(savecollege);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// user side
router.get("/college", async (req, res) => {
  try {
    const allcollege = await College.find();

    res.status(200).send(allcollege);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
