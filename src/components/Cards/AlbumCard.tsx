import { Link } from "react-router-dom";
import { Album } from "../../types";
import Rating from "../Rating/Rating";
import styles from "./AlbumCard.module.css";

interface AlbumCardProps {
  album: Album;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <Link to={`/albums/${album.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={album.coverUrl}
          alt={album.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <span className={styles.viewAlbum}>View Album →</span>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{album.title}</h3>
        <p className={styles.artist}>{album.artistName}</p>
        <div className={styles.meta}>
          <span className={styles.year}>
            {new Date(album.releaseDate).getFullYear()}
          </span>
          <div className={styles.genre}>
            {album.genre.map((g, idx) => (
              <span key={idx} className={styles.genreTag}>
                {g}
              </span>
            ))}
          </div>
        </div>
        {album.rating && (
          <div className={styles.rating}>
            <Rating value={album.rating} />
            <span className={styles.ratingValue}>
              {album.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default AlbumCard;
