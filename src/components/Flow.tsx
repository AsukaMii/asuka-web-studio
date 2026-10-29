import common from "@/styles/common.module.css";
import styles from "./Flow.module.css";
import { flow } from "@/data/business";

// 「ご相談から公開まで」セクション
export default function Flow() {
  return (
    <section className={common.section}>
      <div className={common.container}>
        <h2 className={common.title}>ご相談から公開まで</h2>
        {/* 順番に意味があるので ol（番号付きリスト）を使う */}
        <ol className={styles.list}>
          {/* map の2つ目の引数 i は 0 から始まる番号 */}
          {flow.map((f, i) => (
            <li key={f.step} className={styles.item}>
              <span className={styles.num}>{i + 1}</span>
              <h3>{f.step}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}