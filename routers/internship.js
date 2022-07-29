const express = require("express");
const router = new express.Router();
const Internship = require("../schema_details/internshipDetails");

router.post("/internship", (req, res) => {

    const internship = {

        company: req.body.company,
        batch: req.body.batch,
        location: req.body.location,
        link: req.body.link,
        package: req.body.package

    }

    Internship.insertMany(internship, (err) => {

        if(err){
    
          console.log(err);
        }else{
    
          console.log("successfully added internship to database");
        }

    })

});

module.exports = router;
