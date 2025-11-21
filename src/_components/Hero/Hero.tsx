import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Aviation</h1>
        <p className={styles.subtitle}>
          Explore the skies and discover amazing flight experiences
        </p>
        
        <div className={styles.cta}>
          <Link href="/sign-up" className={styles.primaryBtn}>
            Get Started
          </Link>
          <Link href="/about" className={styles.secondaryBtn}>
            Learn More
          </Link>
        </div>
      </div>

      <div className={styles.background}>
        <div className={styles.planeIcon}>✈️</div>
      </div>
    </section>
  );
}
