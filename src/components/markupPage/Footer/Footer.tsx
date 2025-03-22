'use client';

import Link from 'next/link';
import ThemeSwitcher from '@/components/UI/ThemeSwitcher/ThemeSwitcher';
import styles from './Footer.module.css';

const Footer = () => {
  const handlerScrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div className={styles.regionFooter}>
        <div className={styles.over__toUpper}>
          <div className={styles.toUpper} onClick={handlerScrollUp}>
            Вверх
          </div>
        </div>
        <div className={styles.footerSiteName}>
          <Link href="/">
            <div className={styles.footerLink} title="Вернуться на главную">
              Алексей К 2024 год
            </div>
          </Link>
        </div>
        <ThemeSwitcher />
      </div>
    </>
  );
};

export default Footer;
