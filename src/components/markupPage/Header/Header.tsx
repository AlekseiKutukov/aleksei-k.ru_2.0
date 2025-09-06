import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_logo_search}>
        <Link href="/">
          <div className={styles.logo}>AJIEKCEU K</div>
        </Link>
        <div className={styles.search}>{/* <Search /> */}</div>
      </div>
    </div>
  );
};

export default Header;
