import common from "@/styles/common.module.css";
import styles from "./Works.module.css";
import { works } from "@/data/business";

// 「実績」セクション
export default function Works() {
  return (
    <section id="works" className={common.section}>
      <div className={common.container}>
        <h2 className={common.title}>実績</h2>
        <ul className={styles.grid}>
          {works.map((w) => (
            <li key={w.title} className={styles.work}>
              {/* サムネイル（あとで実際のスクリーンショットに差し替える） */}
              <div className={styles.thumb} aria-hidden="true">
                <span />
                <span />
              </div>
              <div className={styles.body}>
                <p className={styles.meta}>
                  <span className={styles.tag}>{w.tag}</span>
                  {w.tech}
                </p>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}