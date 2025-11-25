import { useState, useMemo } from "react";
import { concerts } from "../../data/concerts";
import ConcertCard from "../../components/Cards/ConcertCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Concerts.module.css";

const Concerts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("All");

  const cities = ["All", ...Array.from(new Set(concerts.map((c) => c.city)))];

  const filteredConcerts = useMemo(() => {
    return concerts.filter((concert) => {
      const matchesSearch =
        concert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concert.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concert.venue.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity =
        selectedCity === "All" || concert.city === selectedCity;

      return matchesSearch && matchesCity;
    });
  }, [searchQuery, selectedCity]);

  return (
    <main className={styles.concerts}>
      <div className={styles.container}>
        <h1 className={styles.title}>Upcoming & Past Concerts</h1>

        <div className={styles.filters}>
          <SearchBar
            placeholder="Search concerts, artists, or venues..."
            onSearch={setSearchQuery}
          />

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={styles.select}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.results}>
          <p className={styles.resultCount}>
            {filteredConcerts.length} concert
            {filteredConcerts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className={styles.grid}>
          {filteredConcerts.map((concert) => (
            <ConcertCard key={concert.id} concert={concert} />
          ))}
        </div>

        {filteredConcerts.length === 0 && (
          <div className={styles.noResults}>
            <p>No concerts found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Concerts;
