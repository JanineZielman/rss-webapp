import styles from "./page.module.css";
import Parser from "rss-parser";

export default async function Home() {
  const parser = new Parser();
  
  // Define multiple RSS feed URLs and their names
  const feedSources = [
    { url: "https://apod.nasa.gov/apod.rss", name: "NASA Astronomy Picture of the Day" },
    { url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", name: "The New York Times" },
    // { url: "https://feeds.bbci.co.uk/news/rss.xml", name: "BBC News" },
    { url: "https://www.theguardian.com/world/rss", name: "The Guardian" },
    
  ];

  // Fetch and parse all feeds
  const feeds = await Promise.all(
    feedSources.map(async ({ url, name }) => {
      const feed = await parser.parseURL(url);
      return feed.items.map(item => ({ ...item, source: name })); // Attach source name to each item
    })
  );

  // Combine all items into a single array
  let allItems = feeds.flat();

  // Sort items by date (if `pubDate` is available)
  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  // Slice to limit the number of displayed articles
  const items = allItems.slice(0, 42);

  console.log(items)

  return (
    <div className={styles.page}>
      <h1>Your RSS Feed</h1>
      <div className={styles.grid}>
        {items.map((item, index) => {
          let imageUrl = item.enclosure?.url || ""; 

          if (!imageUrl && item.content) {
            const match = item.content.match(/<img.*?src=["'](.*?)["']/);
            imageUrl = match ? match[1] : "";
          }

          return (
            <div key={index} className={`${styles.gridItem} ${item.source.replaceAll(' ', '-')}`}>
              {imageUrl && <img src={imageUrl} alt={item.title} />}
              <h2>{item.title}</h2>
              <p><strong>{item.source}</strong> - {item.creator || item.author || "Unknown Author"}</p>
              <div dangerouslySetInnerHTML={{ __html: item.content }}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}
