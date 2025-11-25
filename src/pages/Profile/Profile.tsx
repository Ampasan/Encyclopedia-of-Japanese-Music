import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { artists } from "../../data/artists";
import { albums } from "../../data/albums";
import { concerts } from "../../data/concerts";
import ArtistCard from "../../components/Cards/ArtistCard";
import AlbumCard from "../../components/Cards/AlbumCard";
import ConcertCard from "../../components/Cards/ConcertCard";
import styles from "./Profile.module.css";

const Profile = () => {
  const {
    user,
    removeFavoriteArtist,
    removeSavedAlbum,
    removeConcertAttending,
    updateUser,
  } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <main className={styles.profile}>
        <div className={styles.container}>
          <p>Please log in to view your profile.</p>
        </div>
      </main>
    );
  }

  const favoriteArtists = artists.filter((a) =>
    user.favoriteArtists?.includes(a.id)
  );
  const savedAlbums = albums.filter((a) => user.savedAlbums?.includes(a.id));
  const concertsAttending = concerts.filter((c) =>
    user.concertsAttending?.includes(c.id)
  );

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        updateUser({ avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarDelete = () => {
    setAvatarPreview(null);
    updateUser({ avatar: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveArtist = (artistId: string) => {
    removeFavoriteArtist(artistId);
  };

  const handleRemoveAlbum = (albumId: string) => {
    removeSavedAlbum(albumId);
  };

  const handleRemoveConcert = (concertId: string) => {
    removeConcertAttending(concertId);
  };

  return (
    <main className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarContainer}>
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className={styles.avatarImage}
                />
              ) : (
                <div className={styles.avatar}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className={styles.avatarActions}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.avatarBtn}
                  title="Change Avatar"
                >
                  📷
                </button>
                {avatarPreview && (
                  <button
                    onClick={handleAvatarDelete}
                    className={styles.avatarBtn}
                    title="Delete Avatar"
                  >
                    🗑️
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.username}>{user.username}</h1>
            {user.bio && <p className={styles.bio}>{user.bio}</p>}
            {user.favoriteGenres && user.favoriteGenres.length > 0 && (
              <div className={styles.genres}>
                {user.favoriteGenres.map((genre, idx) => (
                  <span key={idx} className={styles.genreTag}>
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>
          <Link to="/settings" className={styles.editBtn}>
            Edit Profile
          </Link>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Favorite Artists</h2>
          {favoriteArtists.length > 0 ? (
            <div className={styles.grid}>
              {favoriteArtists.map((artist) => (
                <div key={artist.id} className={styles.cardWrapper}>
                  <ArtistCard artist={artist} />
                  <button
                    onClick={() => handleRemoveArtist(artist.id)}
                    className={styles.removeBtn}
                    title="Remove from favorites"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No favorite artists yet.</p>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Saved Albums</h2>
          {savedAlbums.length > 0 ? (
            <div className={styles.grid}>
              {savedAlbums.map((album) => (
                <div key={album.id} className={styles.cardWrapper}>
                  <AlbumCard album={album} />
                  <button
                    onClick={() => handleRemoveAlbum(album.id)}
                    className={styles.removeBtn}
                    title="Remove from saved"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No saved albums yet.</p>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Concerts I'm Attending</h2>
          {concertsAttending.length > 0 ? (
            <div className={styles.concertGrid}>
              {concertsAttending.map((concert) => (
                <div key={concert.id} className={styles.cardWrapper}>
                  <ConcertCard concert={concert} />
                  <button
                    onClick={() => handleRemoveConcert(concert.id)}
                    className={styles.removeBtn}
                    title="Remove from schedule"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No concerts scheduled.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;
