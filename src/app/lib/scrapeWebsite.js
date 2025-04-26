import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeWebsite(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let articles = [];


  $('.gradient-content').each((i, elem) => {
    articles.push({
      title: $(elem).find('h1, h2, h3').first().text().trim(),
      link: $(elem).find('a').first().attr('href'),
      snippet: $(elem).find('p').first().text().trim(),
      date: $(elem).find('time').attr('datetime') || new Date().toISOString(),
    });
  });

  console.log('articles', articles)

  return articles;
}
