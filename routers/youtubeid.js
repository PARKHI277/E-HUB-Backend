require("dotenv").config();
const express = require("express");
const { youtube } = require("googleapis/build/src/apis/youtube");
const router = new express.Router();
const Youtube = require("../models/youtube");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// admin side
router.post("/youtubeapi/:videoId", async (req, res) => {
  const videoId = req.params.videoId;
  console.log(videoId);
  // const idExist = await Youtube.findOne({ videoId });
  // if (idExist) {
  //   return res.status(200).send({ message: "This videoId already exists." });
  // }
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.Youtubekey}`;
  const youtube = await fetch(url);
  let response = await youtube.json();
  var channels = response.items;
  // for console
  if (channels.length == 0) {
    console.log("No channel found.");
    return res
      .status(400)
      .send({ message: "No channel found with this videoid" });
  } else {
    console.log(
      "This channel's ID is %s. Its title is '%s', and " + "it has %s views.",
      channels[0].id,
      channels[0].snippet.title,
      channels[0].snippet.publishedAt,
      channels[0].snippet.channelTitle
    );
  }
  // console.log(channels[0].snippet.thumbnails);
  // saving in database
  try {
    (id = channels[0].id),
      (title = channels[0].snippet.title),
      (publishedAt = channels[0].snippet.publishedAt),
      (channelTitle = channels[0].snippet.channelTitle),
      (description = channels[0].snippet.description),
      (thumbnails = channels[0].snippet.thumbnails);
    const youtube_id = new Youtube({
      videoId,
      publishedAt,
      title,
      description,
      thumbnails,
      channelTitle,
    });
    const saveid = await youtube_id.save();
    res.status(201).send(saveid);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
  // res.status(200).send(response);
});

router.get("/youtubeapi", async (req, res) => {
  try {
    const allids = await Youtube.find().sort({ createdAt: -1 });

    res.status(200).send(allids);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
