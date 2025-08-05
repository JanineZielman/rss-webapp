import { scrapeWebsite } from '../../lib/scrapeWebsite'; // adjust import path if needed

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const className = searchParams.get('className'); // 👈 NEW

  if (!url || !className) {
    return new Response(JSON.stringify({ error: 'Missing URL or className' }), { status: 400 });
  }

  try {
    const articles = await scrapeWebsite(url, className); // 👈 PASS className

    return new Response(JSON.stringify({ articles }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Scraping error:', err.message);
    return new Response(JSON.stringify({ error: 'Failed to scrape site' }), { status: 500 });
  }
}
