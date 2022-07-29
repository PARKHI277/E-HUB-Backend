const express = require("express");
const router = new express.Router();
const Magazine = require("../schema_details/magazineDetails");

router.post("/magazine", (req, res) => {

    const magazine = {

        topic: req.body.topic,
        body: req.body.body

    }

    Magazine.insertMany(magazine, (err) => {

        if(err){
    
          console.log(err);
        }else{
    
          console.log("successfully added internship to database");
        }

    })

});

module.exports = router;
