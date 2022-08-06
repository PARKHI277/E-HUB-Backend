const express = require("express");
const CampusActivity = require("../schema_details/campusActivity");
const router = new express.Router();
const campusActivity = require("../schema_details/campusActivity");

router.post("/campus-activities", (req, res) => {

    const activity = {

        // schema yet to decide

    }

    CampusActivity.insertMany(activity, (err) => {

        if(err){
    
          console.log(err);
        }else{
    
          console.log("successfully added campus activity to database");
        }

    })

});

module.exports = router;
