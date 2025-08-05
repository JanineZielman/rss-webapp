'use client'
import { useState } from 'react';

export default function PreviewPage() {
  const [url, setUrl] = useState('https://zwermers.nl/');
  const [className, setClassName] = useState('archief-item');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleScrape(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/scrapeWebsite?url=${encodeURIComponent(url)}&className=${encodeURIComponent(className)}`);
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
      <form onSubmit={handleScrape} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
        <input
          type="text"
          placeholder="Enter website URL"
          className="border p-2 flex-grow"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter class name"
          className="border p-2 flex-grow"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Loading...' : 'Scrape'}
        </button>
      </form>

      <div className="grid gap-4">
        {articles.map((article, index) => (
          <div key={index} className="item border p-4 rounded shadow">
            {article.title &&
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-green-700 hover:underline">
                <h2>{article.title}</h2>
              </a>
            }
            {article.snippet && <p className="text-sm text-gray-600">{article.snippet}</p>}
            {article.date && <p className="text-xs text-gray-400">{article.date}</p>}
            {article.img && <img src={article.img} alt="Article Image" className="mt-2 max-h-40 object-cover"/>}
          </div>
        ))}
      </div>
    </div>
  );
}
