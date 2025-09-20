const Url = require("../models/Url");
const generateShortId = require("../utils/generateShortId");

exports.createShortUrl = async (req, res) => {
  const { originalUrl, validityMinutes } = req.body;

  if (!originalUrl) return res.status(400).json({ error: "Original URL required" });

  const shortId = generateShortId();
  const expiry = validityMinutes || process.env.DEFAULT_URL_EXPIRY || 30;
  const expiresAt = new Date(Date.now() + expiry * 60000);

  const newUrl = await Url.create({ originalUrl, shortId, expiresAt });
  res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`, expiresAt });
};

exports.redirectUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).json({ error: "URL has expired" });
    }

    // Increment visit count
    url.visitCount += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStats = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortId: url.shortId,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
      visitCount: url.visitCount
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};