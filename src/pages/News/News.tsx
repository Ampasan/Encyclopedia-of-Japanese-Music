import { useState, useMemo } from "react";
import { news } from "../../data/news";
import { Genre } from "../../types";
import NewsCard from "../../components/Cards/NewsCard";
import styles from "./News.module.css";

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState<Genre | "All">(
    "All"
  );

  const categories: (Genre | "All")[] = [
    "All",
    "J-Pop",
    "J-Rock",
    "Pop Rock",
    "Electronic",
    "Anisong",
  ];

  const filteredNews = useMemo(() => {
    if (selectedCategory === "All") return news;
    return news.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className={styles.news}>
      <div className={styles.container}>
        <h1 className={styles.title}>News</h1>

        <div className={styles.filters}>
          <div className={styles.categoryTabs}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryTab} ${
                  selectedCategory === category ? styles.active : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.results}>
          <p className={styles.resultCount}>
            {filteredNews.length} article{filteredNews.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        <div className={styles.grid}>
          {filteredNews.map((newsItem) => (
            <NewsCard key={newsItem.id} news={newsItem} />
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className={styles.noResults}>
            <p>No news articles found.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default News;
