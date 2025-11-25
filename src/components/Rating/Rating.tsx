import styles from "./Rating.module.css";

interface RatingProps {
  value: number;
  max?: number;
  size?: "small" | "medium" | "large";
}

const Rating = ({ value, max = 5, size = "medium" }: RatingProps) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`${styles.rating} ${styles[size]}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={i} className={styles.star}>
          ★
        </span>
      ))}
      {hasHalfStar && (
        <span className={`${styles.star} ${styles.half}`}>★</span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={i} className={`${styles.star} ${styles.empty}`}>
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
