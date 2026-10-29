import common from "@/styles/common.module.css";
import styles from "./Worries.module.css";
import { worries } from "@/data/business";

// 「こんなお悩みはありませんか」セクション
export default function Worries() {
  return (
    <section className={styles.worries}>
      <div className={common.container}>
        <h2 className={common.title}>こんなお悩みはありませんか</h2>
        <ul className={styles.list}>
          {worries.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
        <p className={styles.answer}>
          ひとつでも当てはまれば、まずはお話を聞かせてください。
        </p>
      </div>
    </section>
  );
}