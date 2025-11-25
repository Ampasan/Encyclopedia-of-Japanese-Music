import { Link } from 'react-router-dom';
import { Concert } from '../../types';
import styles from './ConcertCard.module.css';

interface ConcertCardProps {
  concert: Concert;
}

const ConcertCard = ({ concert }: ConcertCardProps) => {

  return (
    <Link to={`/concerts/${concert.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={concert.posterUrl}
          alt={concert.name}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <span className={styles.viewDetails}>View Details →</span>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{concert.name}</h3>
        <p className={styles.artist}>{concert.artistName}</p>
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.icon}>📍</span>
            <span>{concert.venue}, {concert.city}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.icon}>📅</span>
            <span>{new Date(concert.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.icon}>🕐</span>
            <span>{concert.time}</span>
          </div>
          {concert.price && (
            <div className={styles.detailItem}>
              <span className={styles.icon}>💰</span>
              <span>{concert.price}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ConcertCard;

