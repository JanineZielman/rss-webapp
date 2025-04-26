import { scrapeWebsite } from '../../lib/scrapeWebsite';
import RSS from 'rss';

export default async function handler(req, res) {
  const url = req.query.url || req.body?.url;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    const articles = await scrapeWebsite(url);

    const feed = new RSS({
      title: `FeedForward Custom Feed for ${url}`,
      description: 'A lightweight, sustainable feed.',
      feed_url: `https://yourdomain.com/api/generateFeed?url=${encodeURIComponent(url)}`,
      site_url: url,
    });

    articles.forEach(article => {
      feed.item({
        title: article.title,
        description: article.snippet,
        url: article.link.startsWith('http') ? article.link : url + article.link,
        date: article.date,
      });
    });

    res.setHeader('Content-Type', 'application/rss+xml');
    res.send(feed.xml());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate feed' });
  }
}
