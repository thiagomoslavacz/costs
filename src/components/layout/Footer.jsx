import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  const socialLinks = [
    {
      id: "Linkedin",
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/thiagomoslavacz",
    },
    {
      id: "Github",
      icon: <FaGithub />,
      url: "https://github.com/thiagomoslavacz",
    },
    {
      id: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/thiagomoslavacz",
    },
  ];

  return (
    <footer className={styles.footer}>
      <ul className={styles.socialLinks}>
        {socialLinks.map((item) => (
          <li key={item.id}>
            <a
              className={styles.link}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}
            </a>
          </li>
        ))}
      </ul>

      <p className={styles.copyright}>
        &copy; <span>Costs</span> / 2026
      </p>
    </footer>
  );
}

export default Footer;
