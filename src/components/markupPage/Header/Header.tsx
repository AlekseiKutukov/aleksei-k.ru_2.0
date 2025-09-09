import Link from "next/link";
import Search from "@/components/UI/Search/Search";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__logoSearch}>
        <Link href="/">
          <div className={styles.header__logo}>AJIEKCEU K</div>
        </Link>
        <div className={styles.header__search}>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Header;
