import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { concerts } from "../../data/concerts";
import { useAuth } from "../../contexts/AuthContext";
import ConcertCard from "../../components/Cards/ConcertCard";
import PaymentSuccessModal from "../../components/Modal/PaymentSuccessModal";
import styles from "./ConcertDetail.module.css";

const ConcertDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user, addConcertAttending, removeConcertAttending } =
    useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const concert = concerts.find((c) => c.id === id);
  const previousConcerts = concerts
    .filter((c) => c.artistId === concert?.artistId && c.id !== id)
    .slice(0, 3);

  const isAttending = user?.concertsAttending?.includes(id || "") || false;

  const handleToggleSchedule = () => {
    if (!id) return;
    if (isAttending) {
      removeConcertAttending(id);
    } else {
      addConcertAttending(id);
    }
  };

  const handleBuyTickets = () => {
    setIsPaymentModalOpen(true);
  };

  if (!concert) {
    return (
      <main className={styles.concertDetail}>
        <div className={styles.container}>
          <p>Concert not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.concertDetail}>
      <div className={styles.hero}>
        <div className={styles.posterContainer}>
          <img
            src={concert.posterUrl}
            alt={concert.name}
            className={styles.poster}
          />
        </div>
        <div className={styles.info}>
          <h1 className={styles.name}>{concert.name}</h1>
          <Link to={`/artists/${concert.artistId}`} className={styles.artist}>
            {concert.artistName}
          </Link>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.icon}>📍</span>
              <div>
                <div className={styles.detailLabel}>Venue</div>
                <div className={styles.detailValue}>{concert.venue}</div>
                <div className={styles.detailSubValue}>{concert.city}</div>
              </div>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.icon}>📅</span>
              <div>
                <div className={styles.detailLabel}>Date</div>
                <div className={styles.detailValue}>
                  {new Date(concert.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.icon}>🕐</span>
              <div>
                <div className={styles.detailLabel}>Time</div>
                <div className={styles.detailValue}>{concert.time}</div>
              </div>
            </div>
            {concert.price && (
              <div className={styles.detailItem}>
                <span className={styles.icon}>💰</span>
                <div>
                  <div className={styles.detailLabel}>Price</div>
                  <div className={styles.detailValue}>{concert.price}</div>
                </div>
              </div>
            )}
          </div>
          {concert.description && (
            <p className={styles.description}>{concert.description}</p>
          )}
          <div className={styles.actions}>
            <button onClick={handleBuyTickets} className={styles.ticketBtn}>
              Buy Tickets
            </button>
            {isAuthenticated && (
              <button
                onClick={handleToggleSchedule}
                className={`${styles.scheduleBtn} ${
                  isAttending ? styles.attending : ""
                }`}
              >
                {isAttending ? "✓ Added to Schedule" : "+ Add to My Schedule"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {previousConcerts.length > 0 && (
          <section className={styles.previousConcerts}>
            <h2 className={styles.sectionTitle}>
              Another Concerts by {concert.artistName}
            </h2>
            <div className={styles.concertsGrid}>
              {previousConcerts.map((concert) => (
                <ConcertCard key={concert.id} concert={concert} />
              ))}
            </div>
          </section>
        )}
      </div>

      <PaymentSuccessModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        concertName={concert.name}
      />
    </main>
  );
};

export default ConcertDetail;
