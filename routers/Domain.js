const express = require("express");
const router = new express.Router();
const Domain = require("../schema_details/domains");

const mongoose = require("mongoose");

router.post("/Handbook", async (req, res, next) => {
  try {
    const { Title, Content } = await req.body;
    const resource_create = new Domain({
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
router.post("/Resource", async (req, res, next) => {
  try {
    const { ResourceTitle, ResourceLink } = await req.body;
    const resourcelink_create = new Domain({
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
router.post("/Mentor", async (req, res, next) => {
  try {
    const { MentorName, MentorDomain, MentorNumber } = await req.body;
    const Mentor_create = new Domain({
      MentorName,
      MentorDomain,
      MentorNumber,
    });
    const mentor = await Mentor_create.save();
    res.status(201).send(mentor);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// ask your query and O-auth left

module.exports = router;
