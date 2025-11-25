import { Link } from "react-router-dom";
import { artists } from "../../data/artists";
import { albums } from "../../data/albums";
import { concerts } from "../../data/concerts";
import { news } from "../../data/news";
import ArtistCard from "../../components/Cards/ArtistCard";
import AlbumCard from "../../components/Cards/AlbumCard";
import ConcertCard from "../../components/Cards/ConcertCard";
import NewsCard from "../../components/Cards/NewsCard";
import styles from "./Home.module.css";

const Home = () => {
  const topArtists = artists.slice(0, 4);
  const latestAlbums = albums.slice(0, 4);
  const upcomingConcerts = concerts.slice(0, 4);
  const latestNews = news.slice(0, 4);

  return (
    <main className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Japan's Hottest Beats 🎶
          </h1>
          <p className={styles.heroSubtitle}>
            Your ultimate destination for J-Pop, J-Rock, Anisong, and more
          </p>
          <Link to="/artists" className={styles.heroCTA}>
            Explore Artists
          </Link>
        </div>
        <div className={styles.heroBackground}></div>
      </section>

      {/* Top Rated Artists */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top Rated Artists</h2>
            <Link to="/artists" className={styles.viewAllBtn}>
              View All Artists →
            </Link>
          </div>
          <div className={styles.grid}>
            {topArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Albums */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Latest Albums</h2>
            <Link to="/albums" className={styles.viewAllBtn}>
              Explore Albums →
            </Link>
          </div>
          <div className={styles.grid}>
            {latestAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Concerts */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Upcoming Concerts</h2>
            <Link to="/concerts" className={styles.viewAllBtn}>
              View All Concerts →
            </Link>
          </div>
          <div className={styles.concertGrid}>
            {upcomingConcerts.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>OtoBeats News</h2>
            <Link to="/news" className={styles.viewAllBtn}>
              View All News →
            </Link>
          </div>
          <div className={styles.newsGrid}>
            {latestNews.map((newsItem) => (
              <NewsCard key={newsItem.id} news={newsItem} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
