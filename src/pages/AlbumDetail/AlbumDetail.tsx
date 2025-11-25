import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { albums } from "../../data/albums";
import { useAuth } from "../../contexts/AuthContext";
import AlbumCard from "../../components/Cards/AlbumCard";
import Rating from "../../components/Rating/Rating";
import styles from "./AlbumDetail.module.css";

const AlbumDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user, addSavedAlbum, removeSavedAlbum, rateAlbum } =
    useAuth();
  const album = albums.find((a) => a.id === id);
  const similarAlbums = albums
    .filter((a) => a.id !== id && a.genre.some((g) => album?.genre.includes(g)))
    .slice(0, 4);

  const isSaved = user?.savedAlbums?.includes(id || "") || false;
  const userRating = id ? user?.albumRatings?.[id] : undefined;
  const [selectedRating, setSelectedRating] = useState<number>(userRating ?? 5);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  useEffect(() => {
    setSelectedRating(userRating ?? 5);
  }, [userRating, id]);

  const handleToggleSave = () => {
    if (!id) return;
    if (isSaved) {
      removeSavedAlbum(id);
    } else {
      addSavedAlbum(id);
    }
  };

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsSubmittingRating(true);
    rateAlbum(id, selectedRating);
    setTimeout(() => setIsSubmittingRating(false), 400);
  };

  if (!album) {
    return (
      <main className={styles.albumDetail}>
        <div className={styles.container}>
          <p>Album not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.albumDetail}>
      <div className={styles.hero}>
        <div className={styles.coverContainer}>
          <img
            src={album.coverUrl}
            alt={album.title}
            className={styles.cover}
          />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{album.title}</h1>
          <Link to={`/artists/${album.artistId}`} className={styles.artist}>
            {album.artistName}
          </Link>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.label}>Release Date:</span>
              <span>
                {new Date(album.releaseDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.label}>Label:</span>
              <span>{album.label}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.label}>Genre:</span>
              <div className={styles.genres}>
                {album.genre.map((g, idx) => (
                  <span key={idx} className={styles.genreTag}>
                    {g}
                  </span>
                ))}
              </div>
            </div>
            {album.rating && (
              <div className={styles.rating}>
                <Rating value={album.rating} size="large" />
                <span className={styles.ratingValue}>
                  {album.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <div className={styles.actions}>
            {album.spotifyUrl && (
              <a
                href={album.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.listenBtn}
              >
                🎵 Listen on Spotify
              </a>
            )}
            {album.youtubeUrl && (
              <a
                href={album.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.listenBtn}
              >
                ▶️ Listen on YouTube
              </a>
            )}
            {isAuthenticated && (
              <button
                onClick={handleToggleSave}
                className={`${styles.saveBtn} ${isSaved ? styles.saved : ""}`}
              >
                {isSaved ? "✓ Saved" : "💾 Save"}
              </button>
            )}
          </div>
          {isAuthenticated ? (
            <section className={styles.userRatingSection}>
              <div className={styles.userRatingHeader}>
                <h3 className={styles.userRatingTitle}>Your Rating</h3>
                {userRating && (
                  <span className={styles.userRatingInfo}>
                    Last saved: {userRating.toFixed(1)} / 5
                  </span>
                )}
              </div>
              <form
                className={styles.userRatingForm}
                onSubmit={handleSubmitRating}
              >
                <div className={styles.userRatingPreview}>
                  <Rating value={selectedRating} size="medium" />
                  <span className={styles.userRatingValue}>
                    {selectedRating.toFixed(1)} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={selectedRating}
                  className={styles.userRatingSlider}
                  onChange={(e) => setSelectedRating(Number(e.target.value))}
                />
                <div className={styles.userRatingActions}>
                  <button
                    type="submit"
                    className={styles.saveBtn}
                    disabled={isSubmittingRating}
                  >
                    {userRating ? "Update Rating" : "Save Rating"}
                  </button>
                  {!userRating && (
                    <span className={styles.userRatingInfo}>
                      Share your first impression of this album.
                    </span>
                  )}
                  {userRating && selectedRating !== userRating && (
                    <span className={styles.userRatingInfo}>
                      Change slider and press update to refresh your rating.
                    </span>
                  )}
                </div>
              </form>
            </section>
          ) : (
            <section className={styles.userRatingNotice}>
              <h3 className={styles.userRatingTitle}>Your Rating</h3>
              <p>Login to rate this album and track your favorites.</p>
            </section>
          )}
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.tracklist}>
          <h2 className={styles.sectionTitle}>Tracklist</h2>
          <div className={styles.tracks}>
            {album.tracks.map((track) => (
              <div key={track.id} className={styles.track}>
                <span className={styles.trackNumber}>{track.trackNumber}</span>
                <span className={styles.trackTitle}>{track.title}</span>
                <span className={styles.trackDuration}>{track.duration}</span>
              </div>
            ))}
          </div>
        </section>

        {similarAlbums.length > 0 && (
          <section className={styles.similarAlbums}>
            <h2 className={styles.sectionTitle}>Fans also liked</h2>
            <div className={styles.albumsGrid}>
              {similarAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default AlbumDetail;
