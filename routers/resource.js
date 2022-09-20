const express = require("express");
const router = new express.Router();
const Resource = require("../models/resource");
const errorController = require("../controllers/errorController");

router.post("/resource", async (req, res, next) => {
  try {
    const { resourceName, resourceLink } = await req.body;
    const resourcenameexist = await Resource.findOne({ resourceName });
    const resourcelinkexist = await Resource.findOne({ resourceLink });
    if (resourcenameexist && resourcelinkexist) {
      return res.status(400).send({ message: "This Resource already exists." });
    }

    const resourcelink_create = new Resource({
      resourceName,
      resourceLink,
    });

    const saveresourcelink = await resourcelink_create.save();
    res.status(201).send(saveresourcelink);
  } catch (err) {
    console.log(err);
    errorController(err, req, res, next);
  }
});

router.get("/resource", async (req, res) => {
  try {
    const allresource = await Resource.find().sort({ createdAt: -1 });

    res.status(200).send(allresource);
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.patch("/resource/:id", async (req, res) => {
//   try {
//     if (!resourceName || !resourceName)
//       return res.status(400).json({
//         success: false,
//         message: "Please fill atleast one field.",
//       });

//     Resource.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       function (err, docs) {
//         if (err) {
//           console.log(err);
//         } else {
//           res.status(200).json({
//             success: true,
//             message: "Resource details got updated ",
//           });
//         }
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({
//       success: false,
//       message: "Enter fields to update ",
//     });
//   }
// });

router.delete("/resource/:id", async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(400).json({
        success: false,
        message: "This resource id doesn't exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Resource Details got deleted",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Please enter valid id",
    });
  }
});

module.exports = router;
