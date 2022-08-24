require("dotenv").config();
const express = require("express");
const { youtube } = require("googleapis/build/src/apis/youtube");
const router = new express.Router();
const Youtube = require("../schema_details/youtube");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
// admin side
router.post("/youtube", async (req, res) => {
  try {
    const videoId = req.body.videoId;
    // const youtubeid = req.params.videoId;
    // const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeid}&key=${process.env.Youtubekey}`;
    // // const youtube = await fetch(
    // //   `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=2iAd-tQVf4c&key=${process.env.Youtubekey}`
    // // );
    // const youtube = await fetch(url);
    // let response = await youtube.json();
    // var channels = response.items;
    // if (channels.length == 0) {
    //   console.log("No channel found.");
    // } else {
    //   console.log(
    //     "This channel's ID is %s. Its title is '%s', and " + "it has %s views.",
    //     channels[0].id,
    //     channels[0].snippet.title,
    //     channels[0].snippet.publishedAt,
    //     channels[0].snippet.channelTitle
    //   );
    // }
    // try {
    //   (id = channels[0].id),
    //     (title = channels[0].snippet.title),
    //     (publishedAt = channels[0].snippet.publishedAt),
    //     (channelTitle = channels[0].snippet.channelTitle);
    //   const youtube_id = new Youtube({
    //     id,
    //     title,
    //     publishedAt,
    //     channelTitle,
    //   });
    //   const saveid = await youtube_id.save();
    //   res.status(201).send(saveid);
    // } catch (err) {
    //   console.log(err);
    //   res.status(400).send(err);
    // }r
    // // es.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

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
module.exports = router;
