require("dotenv").config();
const express = require("express");
const { youtube } = require("googleapis/build/src/apis/youtube");
const router = new express.Router();
const Youtube = require("../schema_details/youtube");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// called api for adding id in datbase and sending back response to admin
router.get("/youtubeapi/:youtubeid", async (req, res) => {
  const youtubeid = req.params.youtubeid;
  console.log(youtubeid);
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeid}&key=${process.env.Youtubekey}`;
  const youtube = await fetch(url);
  let response = await youtube.json();
  var channels = response.items;
  // for console
  if (channels.length == 0) {
    console.log("No channel found.");
  } else {
    console.log(
      "This channel's ID is %s. Its title is '%s', and " + "it has %s views.",
      channels[0].id,
      channels[0].snippet.title,
      channels[0].snippet.publishedAt,
      channels[0].snippet.channelTitle
    );
  }
  // saving in database
  try {
    (id = channels[0].id),
      (title = channels[0].snippet.title),
      (publishedAt = channels[0].snippet.publishedAt),
      (channelTitle = channels[0].snippet.channelTitle);
    const youtube_id = new Youtube({
      id,
      title,
      publishedAt,
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

// admin api
router.post("/youtubeid", async (req, res) => {
  try {
    const videoid = req.body.videoId;
    const api_url = `/youtubeapi/${videoid}`;
    const youtube = await fetch(api_url);
    const response = await youtube.json();
    const data = response.items[0].snippet.title;
    console.log(data);
  } catch (err) {
    console.log(err);

    res.status(400).send(err);
  }
});
module.exports = router;
