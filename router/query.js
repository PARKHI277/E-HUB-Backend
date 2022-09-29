const express = require("express");
const router = new express.Router();
const Query = require("../models/query");
const errorController = require("../controllers/errorController");
const { models } = require("mongoose");

router.post("/query", async (req, res, next) => {
  try {
    const { query } = await req.body;
    const queryexixt = await Query.findOne({ query });

    if (queryexixt) {
      return res.status(200).send({ message: "This Query already exists." });
    }

    const query_create = new Query({
      query,
    });

    const savequery = await query_create.save();
    res.status(201).send(savequery);
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
