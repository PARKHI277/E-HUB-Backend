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

router.delete("/instagram/:id", async (req, res) => {
  try {
    const insta = await Instagram.findByIdAndDelete(req.params.id);
    if (!insta) {
      return res.status(400).json({
        success: false,
        message: "This Instagram id doesn't exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Instagram Details got deleted",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
    });
  }
});

router.patch("/instagram/:id", async (req, res) => {
  try {
    const { url, imageUrl, description } = await req.body;
    if (!(url || imageUrl || description))
      return res.status(400).json({
        success: false,
        message: "Please fill atleast one field.",
      });

    Instagram.findById(req.params.id, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if (docs == null)
          return res.status(400).json({
            success: false,
            message: "Id does not exist",
          });
        Instagram.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json({
                success: true,
                message: "Instagram got updated",
              });
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Enter fields",
    });
  }
});
module.exports = router;
