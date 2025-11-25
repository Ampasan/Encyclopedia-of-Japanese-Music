import { Link } from "react-router-dom";
import { Artist } from "../../types";
import Rating from "../Rating/Rating";
import styles from "./ArtistCard.module.css";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <Link to={`/artists/${artist.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <span className={styles.viewProfile}>View Profile →</span>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{artist.name}</h3>
        {artist.nameKanji && (
          <p className={styles.nameKanji}>{artist.nameKanji}</p>
        )}
        <div className={styles.genre}>
          {artist.genre.map((g, idx) => (
            <span key={idx} className={styles.genreTag}>
              {g}
            </span>
          ))}
        </div>
        {artist.rating && (
          <div className={styles.rating}>
            <Rating value={artist.rating} />
            <span className={styles.ratingValue}>
              {artist.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArtistCard;
