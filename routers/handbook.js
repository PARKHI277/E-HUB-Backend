const express = require("express");
const router = new express.Router();
const Handbook = require("../schema_details/handbook");
const errorController = require("../controllers/errorController");

router.post("/handbook", async (req, res, next) => {
  try {
    const { bookTitle, bookTagline, category, bookimgUrl, pdfUrl, imageUrl } =
      await req.body;
    const bookexixt = await Handbook.find({ bookTitle });

    if (!bookTitle && !bookTagline && !category && !bookimgUrl && !pdfUrl)
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    const handbook_create = new Handbook({
      bookTitle,
      bookTagline,
      category,
      pdfUrl,
      imageUrl,
      bookimgUrl,
    });
    const savehandbook = await handbook_create.save();
    res.status(201).send(savehandbook);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

router.get("/handbook", async (req, res) => {
  try {
    const allhandbooks = await Handbook.find();

    res.status(200).send(allhandbooks);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
