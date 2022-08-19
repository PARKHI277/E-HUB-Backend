const express = require("express");
const router = new express.Router();
const Handbook = require("../schema_details/handbook");

router.post("/Handbook", async (req, res, next) => {
  try {
    const { title, content } = await req.body;
    const resource_create = new Handbook({
      title,
      content,
    });
    const saveresource = await resource_create.save();
    res.status(201).send(saveresource);
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
