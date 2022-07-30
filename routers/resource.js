const express = require("express");
const router = new express.Router();
const Resource = require("../schema_details/resource");

router.post("/Resource", async (req, res, next) => {
  try {
    const { ResourceTitle, ResourceLink } = await req.body;
    const resourcelink_create = new Resource({
      ResourceTitle,
      ResourceLink,
    });
    const saveresourcelink = await resourcelink_create.save();
    res.status(201).send(saveresourcelink);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
