const express = require("express");
const router = new express.Router();
const Query = require("../models/query");
const errorController = require("../controllers/errorController");
const { models } = require("mongoose");

router.post("/query", async (req, res, next) => {
  try {
    const { query } = await req.body;
    const queryExist = await Query.findOne({ query });

    if (queryExist) {
      return res.status(200).send({ message: "This query already exists." });
    }

    const queryCreate = new Query({
      query
    });

    const saveQuery = await queryCreate.save();
    res.status(201).send(saveQuery);
  } catch (err) {
    errorController(err, req, res, next);
  }
});
router.get("/query", async (req, res, nexr) => {
  try {
    const allQueries = await Query.find().sort({ createdAt: -1 });

    res.status(200).send(allQueries);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
