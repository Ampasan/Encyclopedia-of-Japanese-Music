import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { artists } from "../../data/artists";
import { albums as allAlbums } from "../../data/albums";
import { reviews as allReviews } from "../../data/reviews";
import { useAuth } from "../../contexts/AuthContext";
import Rating from "../../components/Rating/Rating";
import AlbumCard from "../../components/Cards/AlbumCard";
import ArtistCard from "../../components/Cards/ArtistCard";
import SuccessModal from "../../components/Modal/SuccessModal";
import { Member, Review } from "../../types";
import styles from "./ArtistDetail.module.css";

const getMemberImageUrl = (member: Member): string | null => {
  const memberImageMap: Record<string, string> = {
    "Kenta Kataoka": "/ArtistImages/Kataoka_Kenta.svg",
    "Tomoyuki Arai": "/ArtistImages/Arai_Tomoyuki.svg",
    "Takayuki Ogawa": "/ArtistImages/Ogawa_Takayuki.svg",
    Ado: "/ArtistImages/adomember.svg",
    Ayase: "/ArtistImages/Ayase.svg",
    Ikura: "/ArtistImages/Ikura.svg",
    LiSA: "/ArtistImages/RisaOribe_member.svg",
    "Eir Aoi": "/ArtistImages/aoieir_member.svg",
    "Saito Kousuke": "/ArtistImages/Kosuke_Saito.svg",
    "Tabuchi Tomoya": "/ArtistImages/Tabuchi_Tomoya.svg",
    "Suzuki Takao": "/ArtistImages/Suzuki_Takao.svg",
    "Yonezu Kenshi": "/ArtistImages/YonezuKenshi_member.svg",
    "Noda Yojiro": "/ArtistImages/Yojiro_Noda.svg",
    "Takeda Yusuke": "/ArtistImages/Yusuke_Takeda.svg",
  };

  return memberImageMap[member.name] || null;
};

const ArtistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<
    "overview" | "discography" | "members" | "reviews"
  >("overview");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { isAuthenticated, user, addFavoriteArtist, removeFavoriteArtist } =
    useAuth();

  const artist = artists.find((a) => a.id === id);
  const artistAlbums = allAlbums.filter((a) => a.artistId === id);
  const artistReviews = useMemo(
    () =>
      allReviews.filter((r) => r.targetId === id && r.targetType === "artist"),
    [id]
  );
  const [reviews, setReviews] = useState<Review[]>(artistReviews);
  useEffect(() => {
    setReviews(artistReviews);
  }, [artistReviews]);
  const similarArtists = artists
    .filter(
      (a) => a.id !== id && a.genre.some((g) => artist?.genre.includes(g))
    )
    .slice(0, 4);

  const isFavorite = user?.favoriteArtists?.includes(id || "") || false;

  const handleToggleFavorite = () => {
    if (!id) return;
    if (isFavorite) {
      removeFavoriteArtist(id);
    } else {
      addFavoriteArtist(id);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim() || !id || !user) return;
    const newReview: Review = {
      id: `review-${Date.now()}`,
      userId: user.id,
      userName: user.username,
      rating: reviewRating,
      comment: reviewText.trim(),
      date: new Date().toISOString(),
      targetType: "artist",
      targetId: id,
    };
    setReviews((prev) => [newReview, ...prev]);
    setReviewText("");
    setReviewRating(5);
    setIsReviewModalOpen(true);
  };

  if (!artist) {
    return (
      <main className={styles.artistDetail}>
        <div className={styles.container}>
          <p>Artist not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.artistDetail}>
      <div className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={artist.imageUrl} alt={artist.name} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.name}>{artist.name}</h1>
          {artist.nameKanji && (
            <h2 className={styles.nameKanji}>{artist.nameKanji}</h2>
          )}
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.label}>Label:</span>
              <span>{artist.label}</span>
            </div>
            {artist.debutYear && (
              <div className={styles.metaItem}>
                <span className={styles.label}>Debut:</span>
                <span>{artist.debutYear}</span>
              </div>
            )}
            <div className={styles.metaItem}>
              <span className={styles.label}>Status:</span>
              <span>{artist.status}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.label}>Genre:</span>
              <div className={styles.genres}>
                {artist.genre.map((g, idx) => (
                  <span key={idx} className={styles.genreTag}>
                    {g}
                  </span>
                ))}
              </div>
            </div>
            {artist.rating && (
              <div className={styles.rating}>
                <Rating value={artist.rating} size="large" />
                <span className={styles.ratingValue}>
                  {artist.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          {isAuthenticated && (
            <button
              onClick={handleToggleFavorite}
              className={`${styles.favoriteBtn} ${
                isFavorite ? styles.favorited : ""
              }`}
            >
              {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
            </button>
          )}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "overview" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "discography" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("discography")}
          >
            Discography
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "members" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "reviews" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "overview" && (
            <div className={styles.overview}>
              <h2 className={styles.sectionTitle}>About</h2>
              <p className={styles.description}>{artist.about}</p>
            </div>
          )}

          {activeTab === "discography" && (
            <div className={styles.discography}>
              <h2 className={styles.sectionTitle}>Discography</h2>
              {artistAlbums.length > 0 ? (
                <div className={styles.albumsGrid}>
                  {artistAlbums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </div>
              ) : (
                <p className={styles.noContent}>No albums available yet.</p>
              )}
            </div>
          )}

          {activeTab === "members" && (
            <div className={styles.members}>
              <h2 className={styles.sectionTitle}>Members</h2>
              <div className={styles.membersGrid}>
                {artist.members.map((member, idx) => {
                  const memberImageUrl = getMemberImageUrl(member);
                  return (
                    <div key={idx} className={styles.memberCard}>
                      <div className={styles.memberAvatar}>
                        {memberImageUrl ? (
                          <img
                            src={memberImageUrl}
                            alt={member.name}
                            className={styles.memberAvatarImg}
                          />
                        ) : (
                          <span>{member.name.charAt(0)}</span>
                        )}
                      </div>
                      <h3 className={styles.memberName}>{member.name}</h3>
                      {member.nameKanji && (
                        <p className={styles.memberNameKanji}>
                          {member.nameKanji}
                        </p>
                      )}
                      <p className={styles.memberRole}>{member.role}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className={styles.reviews}>
              <h2 className={styles.sectionTitle}>Reviews</h2>
              {isAuthenticated && (
                <div className={styles.reviewForm}>
                  <h3>Add a Review</h3>
                  <form onSubmit={handleSubmitReview}>
                    <textarea
                      placeholder="Write your review..."
                      className={styles.reviewInput}
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                    <div className={styles.reviewActions}>
                      <select
                        className={styles.ratingSelect}
                        value={reviewRating}
                        onChange={(e) =>
                          setReviewRating(Number(e.target.value))
                        }
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                      <button type="submit" className={styles.submitBtn}>
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <div className={styles.reviewsList}>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className={styles.reviewCard}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewUser}>
                          <div className={styles.reviewAvatar}>
                            {review.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className={styles.reviewUserName}>
                              {review.userName}
                            </div>
                            <div className={styles.reviewDate}>
                              {new Date(review.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </div>
                          </div>
                        </div>
                        <Rating value={review.rating} size="small" />
                      </div>
                      <p className={styles.reviewComment}>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className={styles.noContent}>
                    No reviews yet. Be the first to review!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {similarArtists.length > 0 && (
          <section className={styles.similarArtists}>
            <h2 className={styles.sectionTitle}>Similar Artists</h2>
            <div className={styles.artistsGrid}>
              {similarArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </section>
        )}
      </div>

      <SuccessModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Review sent successfully!"
        message="Thank you for your review!"
      />
    </main>
  );
};

export default ArtistDetail;
