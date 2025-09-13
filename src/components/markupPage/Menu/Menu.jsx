"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Menu.module.css";
import { menuItems } from "./menuData";

const Menu = ({ children }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Переключение мобильного меню (показать-скрыть)
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={styles.menu__desktop}>
        {/* Десктопное меню */}

        <nav className={styles.menu__desktopNav}>
          <ul className={styles.menu__desktopList}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li
                  key={item.href}
                  className={`${styles.menu__desktopItem} ${
                    isActive ? styles.active : ""
                  }`}
                >
                  <Icon className={styles.icons} />
                  <Link href={item.href}>
                    <span className={styles.menu__desktopText}>
                      {item.text}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Мобильное меню */}

        <button
          className={styles.menu__button}
          onClick={handleMenuToggle}
          aria-expanded={menuOpen}
        >
          <div
            className={`${styles.menu__buttonLine} ${
              menuOpen ? styles.menu__buttonActive1 : ""
            }`}
          />
          <div
            className={`${styles.menu__buttonLine} ${
              menuOpen ? styles.menu__buttonActive2 : ""
            }`}
          />
          <div
            className={`${styles.menu__buttonLine} ${
              menuOpen ? styles.menu__buttonActive3 : ""
            }`}
          />
        </button>

        <ul className={`${styles.menu__mobile} ${menuOpen ? styles.flip : ""}`}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={item.href}
                className={styles[`menu__mobileItem${index + 1}`]}
                style={{ opacity: menuOpen ? 1 : 0 }}
              >
                <Link
                  href={item.href}
                  className={styles.menu__mobileLink}
                  onClick={handleMenuToggle}
                >
                  <Icon className={styles.menu__mobileIcons} />
                  <span>{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Область содержимого */}
        <div className={`${styles.container} ${menuOpen ? styles.flip : ""}`}>
          {menuOpen ? (
            ""
          ) : (
            // с закрытым меню: рендерим children напрямую
            <div className={styles.pageContent}>{children}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
