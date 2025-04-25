import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.css";

import { links } from "./links";

export default function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <span className={styles.headerTitle}>Weather App</span>
      <nav className={styles.headerNav}>
        {links.map((el, index) => (
          <Link
            key={index}
            className={`${styles.headerLink} ${
              location.pathname === el.pathname ? styles.active : ""
            }`}
            to={el.pathname}
          >
            {el.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
