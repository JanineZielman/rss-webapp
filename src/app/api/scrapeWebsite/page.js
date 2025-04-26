'use client'
import { scrapeWebsite } from '../../lib/scrapeWebsite';

export default async function handler(req, res) {
  const url = req.searchParams.url;
  if (!url) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    const articles = await scrapeWebsite(url);
    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape website' });
  }
}
