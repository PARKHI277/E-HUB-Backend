const express = require("express");
const router = new express.Router();
const Resource = require("../schema_details/resource");

router.post("/Resource", async (req, res, next) => {
  try {
    const { resourceTitle, resourceLink } = await req.body;
    const resourcelink_create = new Resource({
      resourceTitle,
      resourceLink,
    });
    const saveresourcelink = await resourcelink_create.save();
    res.status(201).send(saveresourcelink);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/resource", async (req, res) => {
  try {
    const allresource = await Resource.find();

    res.status(200).send(allresource);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
