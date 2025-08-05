import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeWebsite(url, className) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let articles = [];

  $(`.${className}`).each((i, elem) => {
    articles.push({
      title: $(elem).find('h1, h2, h3').first().text().trim(),
      link: $(elem).find('a').first().attr('href'),
      snippet: $(elem).find('p').first().text().trim(),
      date: $(elem).find('.date-time').first().text().trim(),
      img: $(elem).find('img').attr('src'),
    });
  });

  return articles;
}
