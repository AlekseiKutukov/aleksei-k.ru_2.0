"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Menu.module.css";
import { menuItems } from "./menuData";

const Menu = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li
              key={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <Icon className={styles.icons} />
              <Link href={item.href}>
                <span className={styles.navText}>{item.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
