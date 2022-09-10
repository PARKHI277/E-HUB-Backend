const express = require("express");
const router = new express.Router();
const Domain = require("../schema_details/Domain");
const errorController = require("../controllers/errorController");

router.post("/domain", async (req, res) => {
  try {
    const { domain } = await req.body;
    if (!domain)
      return res.status(400).json({
        success: false,
        message: "Please fill Domain Field",
      });
    const domainExist = await Domain.findOne({ domain });

    if (domainExist) {
      return res.status(200).send({ message: "domain already exists." });
    }

    const domain_create = new Domain({
      domain,
    });

    const savedomain = await domain_create.save();
    res.status(201).send(savedomain);
  } catch (err) {
    errorController(err, req, res, next);
  }
});

router.get("/domain", async (req, res) => {
  try {
    const alldomains = await Domain.find();
    // var coll_arr = [];
    domainarray = alldomains.map((alldomain) => alldomain.domain);

    // allcolleges.forEach((elem) => {
    //   coll_arr.push(elem);
    // });
    res.status(200).send(domainarray);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
module.exports = router;
