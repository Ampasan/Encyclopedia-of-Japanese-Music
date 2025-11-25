import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>Explore</h3>
            <ul className={styles.links}>
              <li>
                <Link to="/artists">Artists</Link>
              </li>
              <li>
                <Link to="/albums">Albums</Link>
              </li>
              <li>
                <Link to="/concerts">Concerts</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>About</h3>
            <ul className={styles.links}>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Connect</h3>
            <div className={styles.socialLinks}>
              <SocialIcon
                url="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{ width: 40, height: 40 }}
                bgColor="transparent"
                fgColor="currentColor"
              />
              <SocialIcon
                url="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ width: 40, height: 40 }}
                bgColor="transparent"
                fgColor="currentColor"
              />
              <SocialIcon
                url="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X/Twitter"
                style={{ width: 40, height: 40 }}
                bgColor="transparent"
                fgColor="currentColor"
              />
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>© 2025 OtoBeats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
