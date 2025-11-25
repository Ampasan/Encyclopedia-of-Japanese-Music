import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/artists", label: "Artists" },
    { path: "/albums", label: "Albums" },
    { path: "/concerts", label: "Concerts" },
    { path: "/news", label: "News" },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.navbar} ${
          isMobile && isMenuOpen ? styles.hidden : ""
        }`}
      >
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🎵</span>
            <span className={styles.logoText}>OtoBeats</span>
          </Link>

          {!isMobile && (
            <nav className={styles.nav}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.navLink} ${
                    location.pathname === item.path ? styles.active : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <div className={styles.rightSection}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {isMobile ? (
              <button
                className={`${styles.hamburger} ${
                  isMenuOpen ? styles.open : ""
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            ) : isAuthenticated ? (
              <>
                <Link to="/profile" className={styles.profileLink}>
                  {user?.username || "Profile"}
                </Link>
                <Link to="/settings" className={styles.settingsLink}>
                  Settings
                </Link>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className={styles.loginBtn}>
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div
          className={styles.mobileMenuOverlay}
          onClick={() => setIsMenuOpen(false)}
        >
          <nav
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.mobileMenuTop}>
              <div className={styles.mobileMenuLogo}>
                <span className={styles.logoIcon}>🎵</span>
                <span className={styles.logoText}>OtoBeats</span>
              </div>
              <button
                className={styles.mobileMenuClose}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            {isAuthenticated && (
              <div className={styles.mobileMenuHeader}>
                <div className={styles.mobileUserInfo}>
                  <div className={styles.mobileAvatar}>
                    {user?.username.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className={styles.mobileUsername}>
                      {user?.username || "User"}
                    </div>
                    <div className={styles.mobileUserEmail}>
                      {user?.email || ""}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <ul className={styles.mobileMenuList}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`${styles.mobileMenuItem} ${
                      location.pathname === item.path ? styles.active : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className={styles.mobileMenuItem}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className={styles.mobileMenuItem}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      className={styles.mobileLogoutBtn}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <li>
                  <Link
                    to="/login"
                    className={styles.mobileMenuItem}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
