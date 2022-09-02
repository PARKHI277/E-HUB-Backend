const express = require("express");
const router = new express.Router();
const Branch = require("../schema_details/Branch");
const errorController = require("../controllers/errorController");
// admin side
router.post("/branch", async (req, res, next) => {
  try {
    const { branch } = await req.body;
    const branchExist = await Branch.findOne({ branch });

    if (branchExist) {
      return res.status(200).send({ message: "This Branch already exists." });
    }

    const branch_create = new Branch({
      branch,
    });

    const savebranch = await branch_create.save();
    res.status(201).send(savebranch);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

// user side
router.get("/branch", async (req, res) => {
  try {
    const allbranches = await Branch.find();

    branchearray = allbranches.map((allbranch) => allbranch.branch);

    res.status(200).send(branchearray);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
