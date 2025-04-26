'use client'
import { useState } from 'react';

export default function PreviewPage() {
  const [url, setUrl] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleScrape(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/scrapeWebsite?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch feed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Preview Scraped Feed</h1>
      <form onSubmit={handleScrape} className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Enter website URL"
          className="border p-2 flex-grow"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Loading...' : 'Scrape'}
        </button>
      </form>

      <ul className="space-y-4">
        {articles.map((article, index) => (
          <li key={index} className="border-b pb-2">
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-green-700 hover:underline">
              {article.title}
            </a>
            <p className="text-sm text-gray-600">{article.snippet}</p>
            <p className="text-xs text-gray-400">{new Date(article.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
