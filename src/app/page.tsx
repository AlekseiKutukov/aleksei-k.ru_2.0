import Header from '@/components/markupPage/Header/Header';
import Footer from '@/components/markupPage/Footer/Footer';
import Menu from '@/components/markupPage/Menu/Menu';
import Main from '@/components/markupPage/Main/Main';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Menu />
      <Main />
      <Footer />
    </div>

    //   <main className={styles.main}></main>
    //   <footer className={styles.footer}></footer>
  );
}
