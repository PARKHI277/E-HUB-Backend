const express = require("express");
const router = new express.Router();
const Handbook = require("../schema_details/handbook");

router.post("/handbook", async (req, res, next) => {
  try {
    const { bookTitle, bookTagline, category, pdfUrl, imageUrl } =
      await req.body;
    const handbook_create = new Handbook({
      bookTitle,
      bookTagline,
      category,
      pdfUrl,
      imageUrl,
    });
    const savehandbook = await handbook_create.save();
    res.status(201).send(savehandbook);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
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
