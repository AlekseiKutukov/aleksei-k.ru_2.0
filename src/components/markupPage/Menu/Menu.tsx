"use client";

import { SiTypescript } from "react-icons/si";
import { LiaGitSquare } from "react-icons/lia";
import { FaHome, FaNpm, FaReact } from "react-icons/fa";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";
import { AiOutlineJavaScript } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Menu.module.css";

const Menu = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li
          className={`${styles.navItem} ${
            pathname === "/" ? styles.active : ""
          }`}
        >
          <FaHome className={styles.icons} />
          <Link href="/">
            <span className={styles.navText}>Главная</span>
          </Link>
        </li>

        <li
          className={`${styles.navItem} ${
            pathname === "/react" ? styles.active : ""
          }`}
        >
          <FaReact className={styles.icons} />
          <Link href="/react">
            <span className={styles.navText}>React</span>
          </Link>
        </li>

        <li
          className={`${styles.navItem} ${
            pathname === "/npm" ? styles.active : ""
          }`}
        >
          <FaNpm className={styles.icons} />
          <Link href="/npm">
            <span className={styles.navText}>npm</span>
          </Link>
        </li>

        <li
          className={`${styles.navItem} ${
            pathname === "/git" ? styles.active : ""
          }`}
        >
          <LiaGitSquare className={styles.icons} />
          <Link href="/git">
            <span className={styles.navText}>Git</span>
          </Link>
        </li>

        <li
          className={`${styles.navItem} ${
            pathname === "/ts" ? styles.active : ""
          }`}
        >
          <SiTypescript className={`${styles.icons} ${styles.iconstS}`} />
          <Link href="/ts">
            <span className={styles.navText}>TypeScript</span>
          </Link>
        </li>

        <li
          className={`${styles.navItem} ${
            pathname === "/js" ? styles.active : ""
          }`}
        >
          <AiOutlineJavaScript className={styles.icons} />
          <Link href="/js">
            <span className={styles.navText}>JavaScript</span>
          </Link>
        </li>

        <li
          className={`${styles.navItem} ${
            pathname === "/polezno" ? styles.active : ""
          }`}
        >
          <MdOutlineDoubleArrow className={styles.icons} />
          <Link href="/polezno">
            <span className={styles.navText}>Полезно</span>
          </Link>
        </li>

        <li
          className={`${styles.navItem} ${
            pathname === "/portfolio" ? styles.active : ""
          }`}
        >
          <BsBriefcaseFill className={styles.icons} />
          <Link href="/portfolio">
            <span className={styles.navText}>Портфолио</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
