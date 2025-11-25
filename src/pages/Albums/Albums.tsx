import { useState, useMemo } from "react";
import { albums } from "../../data/albums";
import { Genre } from "../../types";
import AlbumCard from "../../components/Cards/AlbumCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Albums.module.css";

const Albums = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | "All">("All");
  const [sortBy, setSortBy] = useState<"popularity" | "newest" | "rating">(
    "popularity"
  );

  const filteredAndSortedAlbums = useMemo(() => {
    let filtered = albums.filter((album) => {
      const matchesSearch =
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artistName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        selectedGenre === "All" || album.genre.includes(selectedGenre as Genre);

      return matchesSearch && matchesGenre;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return (
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
          );
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
    <main className={styles.albums}>
      <div className={styles.container}>
        <h1 className={styles.title}>Albums</h1>

        <div className={styles.filters}>
          <SearchBar
            placeholder="Search albums, artists, or songs..."
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
            {filteredAndSortedAlbums.length} album
            {filteredAndSortedAlbums.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className={styles.grid}>
          {filteredAndSortedAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>

        {filteredAndSortedAlbums.length === 0 && (
          <div className={styles.noResults}>
            <p>No albums found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Albums;
