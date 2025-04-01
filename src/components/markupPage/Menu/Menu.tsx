import { SiTypescript } from 'react-icons/si';
import { LiaGitSquare } from 'react-icons/lia';
import { FaHome, FaNpm, FaReact } from 'react-icons/fa';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import { BsBriefcaseFill } from 'react-icons/bs';
import { AiOutlineJavaScript } from 'react-icons/ai';
import Link from 'next/link';
import styles from './Menu.module.css';

// динамическое подставка текста
// const Menu = ({ items = ['Home', 'About', 'Work', 'Say hi'] }) => {
//     return (
//       <nav className={styles.nav}>
//         <ul className={styles.navList}>
//           {items.map((text, index) => (
//             <li key={index} className={styles.navItem}>
//               <div className={styles[`${text.toLowerCase()}Icon`]}>
//                 {/* Логика для иконок */}
//               </div>
//               <span className={styles.navText}>{text}</span>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     );
//   };

const Menu = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <FaHome className={styles.icons} />
          <Link href="/">
            <span className={styles.navText}>Главная</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <FaReact className={styles.icons} />
          <Link href="/react">
            <span className={styles.navText}>React</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <FaNpm className={styles.icons} />
          <span className={styles.navText}>npm</span>
        </li>

        <li className={styles.navItem}>
          <LiaGitSquare className={styles.icons} />
          <span className={styles.navText}>Git</span>
        </li>

        <li className={`${styles.navItem} ${styles.navItemtS}`}>
          <SiTypescript className={`${styles.icons} ${styles.iconstS}`} />
          <span className={styles.navText}>TypeScript</span>
        </li>

        <li className={styles.navItem}>
          <AiOutlineJavaScript className={styles.icons} />
          <Link href="/js">
            <span className={styles.navText}>JavaScript</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <MdOutlineDoubleArrow className={styles.icons} />
          <span className={styles.navText}>Полезно</span>
        </li>

        <li className={styles.navItem}>
          <BsBriefcaseFill className={styles.icons} />
          <span className={styles.navText}>Портфолио</span>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
