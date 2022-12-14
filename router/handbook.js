const express = require("express");
const router = new express.Router();
const Handbook = require("../models/handbook");
const errorController = require("../controllers/errorController");

router.post("/handbook", async (req, res, next) => {
  try {
    const {
      bookTitle,
      bookTagline,
      category,
      bookimgUrl,
      pdfUrl,
      description,
    } = await req.body;
    const bookexixt = await Handbook.find({ bookTitle });

    if (
      !bookTitle &&
      !bookTagline &&
      !category &&
      !bookimgUrl &&
      !pdfUrl &&
      !description
    )
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    const handbook_create = new Handbook({
      bookTitle,
      bookTagline,
      category,
      pdfUrl,

      bookimgUrl,
      description,
    });
    const savehandbook = await handbook_create.save();
    res.status(201).send(savehandbook);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

router.get("/handbook", async (req, res) => {
  try {
    const allhandbooks = await Handbook.find().sort({ createdAt: -1 });

    res.status(200).send(allhandbooks);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
