import { useParams } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { news } from "../../data/news";
import NewsCard from "../../components/Cards/NewsCard";
import styles from "./NewsDetail.module.css";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const newsItem = news.find((n) => n.id === id);
  const relatedNews = news
    .filter((n) => n.id !== id && n.category === newsItem?.category)
    .slice(0, 3);

  if (!newsItem) {
    return (
      <main className={styles.newsDetail}>
        <div className={styles.container}>
          <p>News article not found</p>
        </div>
      </main>
    );
  }

  const twitterUrl = `https://twitter.com/`;
  const instagramUrl = `https://www.instagram.com/`;

  return (
    <main className={styles.newsDetail}>
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.categoryTag}>{newsItem.category}</div>
          <h1 className={styles.title}>{newsItem.title}</h1>
          <div className={styles.meta}>
            <span className={styles.date}>
              {new Date(newsItem.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className={styles.author}>by {newsItem.author}</span>
          </div>
        </header>

        {newsItem.imageUrl && (
          <div className={styles.imageContainer}>
            <img
              src={newsItem.imageUrl}
              alt={newsItem.title}
              className={styles.image}
            />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.textContent}>
            {newsItem.content.split("\n").map((paragraph, idx) => (
              <p key={idx} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className={styles.shareSection}>
            <h3 className={styles.shareTitle}>
              <SocialIcon
                style={{ width: 24, height: 24 }}
                bgColor="transparent"
                fgColor="currentColor"
              />
              Share this article
            </h3>
            <div className={styles.shareButtons}>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
              >
                <SocialIcon
                  network="twitter"
                  style={{ width: 20, height: 20 }}
                  bgColor="transparent"
                  fgColor="currentColor"
                />
                Share on X
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
              >
                <SocialIcon
                  network="instagram"
                  style={{ width: 20, height: 20 }}
                  bgColor="transparent"
                  fgColor="currentColor"
                />
                Share on Instagram
              </a>
            </div>
          </div>
        </div>
      </article>

      {relatedNews.length > 0 && (
        <section className={styles.relatedNews}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Related News</h2>
            <div className={styles.newsGrid}>
              {relatedNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default NewsDetail;
