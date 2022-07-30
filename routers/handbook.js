const express = require("express");
const router = new express.Router();
const Handbook = require("../schema_details/handbook");

router.post("/Handbook", async (req, res, next) => {
  try {
    const { Title, Content } = await req.body;
    const resource_create = new Handbook({
      Title,
      Content,
    });
    const saveresource = await resource_create.save();
    res.status(201).send(saveresource);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
