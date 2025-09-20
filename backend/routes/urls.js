import express from 'express';
import Url from '../models/Url.js';
import shortid from 'shortid';

const router = express.Router();

// Create short URL
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  try {
    // Check if URL already exists
    let url = await Url.findOne({ originalUrl });
    
    if (url) {
      return res.json(url);
    }
    
    // Create short code
    const shortCode = shortid.generate();
    
    // Create new URL document
    url = new Url({
      originalUrl,
      shortCode,
    });
    
    await url.save();
    
    res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
});

// Redirect to original URL
router.get('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    
    if (url) {
      url.clicks += 1;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json('URL not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
});

// Get all URLs (for frontend display)
router.get('/', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
});

export default router;