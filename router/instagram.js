const express = require("express");
const router = new express.Router();
const Instagram = require("../models/Instagram");
const errorController = require("../controllers/errorController");

router.post("/instagram", async (req, res, next) => {
  try {
    const { url, imageUrl, description } = await req.body;
    const details = await Instagram.findOne({ url, imageUrl, description });

    if (details) {
      return res.status(400).send({ message: "These details already exists." });
    }

    const insta_create = new Instagram({
      url,
      imageUrl,
      description,
    });

    const saveinsta = await insta_create.save();
    res.status(201).send(saveinsta);
  } catch (err) {
    console.log(err);
    errorController(err, req, res, next);
  }
});

router.get("/instagram", async (req, res) => {
  try {
    const allinsta = await Instagram.find().sort({ createdAt: -1 });

    res.status(200).send(allinsta);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
});
module.exports = router;
