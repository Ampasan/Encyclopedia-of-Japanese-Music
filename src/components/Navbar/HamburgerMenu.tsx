import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./HamburgerMenu.module.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/artists", label: "Artists" },
    { path: "/albums", label: "Albums" },
    { path: "/concerts", label: "Concerts" },
    { path: "/news", label: "News" },
    { path: "/profile", label: "Profile" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🎵</span>
            <span className={styles.logoText}>OtoBeats</span>
          </Link>

          <div className={styles.rightSection}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button
              className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.menuOverlay} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <nav
          className={`${styles.menu} ${isOpen ? styles.open : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.menuHeader}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {user?.username.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <div className={styles.username}>
                  {user?.username || "User"}
                </div>
                <div className={styles.userEmail}>{user?.email || ""}</div>
              </div>
            </div>
          </div>

          <ul className={styles.menuList}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${styles.menuItem} ${
                    location.pathname === item.path ? styles.active : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/settings"
                className={styles.menuItem}
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
            </li>
            <li>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HamburgerMenu;
