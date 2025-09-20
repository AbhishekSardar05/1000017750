const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  redirectUrl,
  getStats,
} = require("../controllers/urlController");

// Create short URL
router.post("/shorten", createShortUrl);

// Redirect to original URL
router.get("/:shortId", redirectUrl);

// Get stats
router.get("/stats/:shortId", getStats);

module.exports = router;
