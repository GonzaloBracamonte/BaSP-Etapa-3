import styles from './footer.module.css';
import fbLogo from 'assets/icons/fb-icon.png';
import twitterLogo from 'assets/icons/twitter-icon.png';
import instagramLogo from 'assets/icons/instagram-icon.png';
import githubLogo from 'assets/icons/github-icon.png';
import linkedInLogo from 'assets/icons/linkedin-icon.png';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.links}>
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <img src={fbLogo} alt="facebook icon" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <img src={twitterLogo} alt="twitter icon" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <img src={instagramLogo} alt="instagram icon" />
        </a>
        <a href="https://github.com" target="_blank" rel="noreferrer">
          <img src={githubLogo} alt="github icon" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
          <img src={linkedInLogo} alt="linkedin icon" />
        </a>
      </div>
      <div className={styles.copyright}>
        <p>Rosario, Argentina.</p>
        <p>Copyright © 2021 Radium Rocket</p>
      </div>
    </footer>
  );
};

export default Footer;
