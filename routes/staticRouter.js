const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  // Fetch all URLs and render the home page
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls, // Pass URLs to the view
    });
});
module.exports = router;