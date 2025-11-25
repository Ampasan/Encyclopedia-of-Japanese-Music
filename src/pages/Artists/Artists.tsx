import { useState, useMemo } from "react";
import { artists } from "../../data/artists";
import { Genre } from "../../types";
import ArtistCard from "../../components/Cards/ArtistCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Artists.module.css";

const Artists = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | "All">("All");
  const [sortBy, setSortBy] = useState<"popularity" | "newest" | "rating">(
    "popularity"
  );

  const filteredAndSortedArtists = useMemo(() => {
    let filtered = artists.filter((artist) => {
      const matchesSearch =
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.nameKanji?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genre.some((g) =>
          g.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesGenre =
        selectedGenre === "All" ||
        artist.genre.includes(selectedGenre as Genre);

      return matchesSearch && matchesGenre;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return (b.debutYear || 0) - (a.debutYear || 0);
        case "popularity":
        default:
          return (b.rating || 0) - (a.rating || 0);
      }
    });

    return filtered;
  }, [searchQuery, selectedGenre, sortBy]);

  const genres: (Genre | "All")[] = [
    "All",
    "J-Pop",
    "J-Rock",
    "Pop Rock",
    "Electronic",
    "Anisong",
  ];

  return (
    <main className={styles.artists}>
      <div className={styles.container}>
        <h1 className={styles.title}>Artists</h1>

        <div className={styles.filters}>
          <SearchBar
            placeholder="Search artists, genres, or labels..."
            onSearch={setSearchQuery}
          />

          <div className={styles.filterGroup}>
            <select
              value={selectedGenre}
              onChange={(e) =>
                setSelectedGenre(e.target.value as Genre | "All")
              }
              className={styles.select}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className={styles.select}
            >
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className={styles.results}>
          <p className={styles.resultCount}>
            {filteredAndSortedArtists.length} artist
            {filteredAndSortedArtists.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className={styles.grid}>
          {filteredAndSortedArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>

        {filteredAndSortedArtists.length === 0 && (
          <div className={styles.noResults}>
            <p>No artists found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Artists;
