const express = require("express");
const router = new express.Router();
const College = require("../schema_details/colleges");
const errorController = require("../controllers/errorController");
// admin side
router.post("/college", async (req, res, next) => {
  try {
    const { collegeName } = await req.body;
    const collegeExist = await College.findOne({ collegeName });

    if (collegeExist) {
      return res.status(200).send({ message: "College already exists." });
    }

    const college_create = new College({
      collegeName,
    });

    const savecollege = await college_create.save();
    res.status(201).send(savecollege);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

// user side
router.get("/college", async (req, res) => {
  try {
    const allcolleges = await College.find();
    // var coll_arr = [];
    collegearray = allcolleges.map((allcollege) => allcollege.collegeName);

    // allcolleges.forEach((elem) => {
    //   coll_arr.push(elem);
    // });
    res.status(200).send(collegearray);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
