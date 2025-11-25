import { Link } from 'react-router-dom';
import { News } from '../../types';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {

  return (
    <Link to={`/news/${news.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={news.thumbnailUrl}
          alt={news.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.categoryTag}>{news.category}</div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{news.title}</h3>
        <div className={styles.meta}>
          <span className={styles.date}>
            {new Date(news.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className={styles.author}>by {news.author}</span>
        </div>
        <p className={styles.excerpt}>{news.content.substring(0, 120)}...</p>
        <span className={styles.readMore}>Read More →</span>
      </div>
    </Link>
  );
};

export default NewsCard;

