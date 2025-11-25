import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Genre } from "../../types";
import SuccessModal from "../../components/Modal/SuccessModal";
import styles from "./Settings.module.css";

const AVAILABLE_GENRES: Genre[] = [
  "J-Pop",
  "J-Rock",
  "Pop Rock",
  "Electronic",
  "Anisong",
];

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<
    "account" | "preferences" | "notifications" | "privacy"
  >("account");
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [favoriteGenres, setFavoriteGenres] = useState<Genre[]>(
    user?.favoriteGenres || []
  );
  const [notifications, setNotifications] = useState({
    news: true,
    albums: true,
    concerts: true,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (user?.favoriteGenres) {
      setFavoriteGenres(user.favoriteGenres);
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenreToggle = (genre: Genre) => {
    const updatedGenres = favoriteGenres.includes(genre)
      ? favoriteGenres.filter((g) => g !== genre)
      : [...favoriteGenres, genre];

    setFavoriteGenres(updatedGenres);
    updateUser({ favoriteGenres: updatedGenres });
  };

  const handleSave = () => {
    updateUser({
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
      favoriteGenres: favoriteGenres,
    });
    setShowSuccessModal(true);
  };

  return (
    <main className={styles.settings}>
      <div className={styles.container}>
        <h1 className={styles.title}>Settings</h1>

        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <button
              className={`${styles.sidebarItem} ${
                activeSection === "account" ? styles.active : ""
              }`}
              onClick={() => setActiveSection("account")}
            >
              Account Settings
            </button>
            <button
              className={`${styles.sidebarItem} ${
                activeSection === "preferences" ? styles.active : ""
              }`}
              onClick={() => setActiveSection("preferences")}
            >
              Preferences
            </button>
            <button
              className={`${styles.sidebarItem} ${
                activeSection === "notifications" ? styles.active : ""
              }`}
              onClick={() => setActiveSection("notifications")}
            >
              Notifications
            </button>
            <button
              className={`${styles.sidebarItem} ${
                activeSection === "privacy" ? styles.active : ""
              }`}
              onClick={() => setActiveSection("privacy")}
            >
              Privacy & Security
            </button>
          </aside>

          <div className={styles.mainContent}>
            {activeSection === "account" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Account Settings</h2>
                <div className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="bio" className={styles.label}>
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className={styles.textarea}
                      rows={4}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="newPassword" className={styles.label}>
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
              </section>
            )}

            {activeSection === "preferences" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Preferences</h2>
                <div className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Theme</label>
                    <div className={styles.toggleGroup}>
                      <button
                        className={`${styles.toggleBtn} ${
                          theme === "dark" ? styles.active : ""
                        }`}
                        onClick={toggleTheme}
                      >
                        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
                      </button>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Favorite Genres</label>
                    <p className={styles.description}>
                      Select your favorite music genres to display on your
                      profile
                    </p>
                    <div className={styles.genresContainer}>
                      {AVAILABLE_GENRES.map((genre) => (
                        <label key={genre} className={styles.genreCheckbox}>
                          <input
                            type="checkbox"
                            checked={favoriteGenres.includes(genre)}
                            onChange={() => handleGenreToggle(genre)}
                          />
                          <span className={styles.genreLabel}>{genre}</span>
                        </label>
                      ))}
                    </div>
                    {favoriteGenres.length === 0 && (
                      <p className={styles.hint}>
                        No genres selected. Your favorite genres will appear on
                        your profile.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {activeSection === "notifications" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Notifications</h2>
                <div className={styles.form}>
                  <div className={styles.toggleItem}>
                    <div>
                      <div className={styles.toggleLabel}>New News</div>
                      <div className={styles.toggleDescription}>
                        Get notified about new articles
                      </div>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={notifications.news}
                        onChange={(e) =>
                          setNotifications((prev) => ({
                            ...prev,
                            news: e.target.checked,
                          }))
                        }
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleItem}>
                    <div>
                      <div className={styles.toggleLabel}>Album Releases</div>
                      <div className={styles.toggleDescription}>
                        Get notified when new albums are released
                      </div>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={notifications.albums}
                        onChange={(e) =>
                          setNotifications((prev) => ({
                            ...prev,
                            albums: e.target.checked,
                          }))
                        }
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleItem}>
                    <div>
                      <div className={styles.toggleLabel}>
                        Upcoming Concerts
                      </div>
                      <div className={styles.toggleDescription}>
                        Get notified about concerts near you
                      </div>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={notifications.concerts}
                        onChange={(e) =>
                          setNotifications((prev) => ({
                            ...prev,
                            concerts: e.target.checked,
                          }))
                        }
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "privacy" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Privacy & Security</h2>
                <div className={styles.form}>
                  <div className={styles.infoItem}>
                    <div>
                      <div className={styles.infoLabel}>Login Status</div>
                      <div className={styles.infoValue}>Active</div>
                    </div>
                  </div>

                  <div className={styles.buttonGroup}>
                    <button className={styles.dangerBtn}>
                      Logout All Devices
                    </button>
                    <button className={styles.dangerBtn}>Delete Account</button>
                  </div>
                </div>
              </section>
            )}

            <div className={styles.actions}>
              <button onClick={handleSave} className={styles.saveBtn}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Settings Saved!"
        message="Your settings have been successfully saved."
      />
    </main>
  );
};

export default Settings;
