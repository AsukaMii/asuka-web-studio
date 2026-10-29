import common from "@/styles/common.module.css";
import styles from "./Strengths.module.css";
import { business, strengths } from "@/data/business";

// 「選ばれる理由」セクション
export default function Strengths() {
  return (
    <section className={common.section}>
      <div className={common.container}>
        <h2 className={common.title}>{business.name}が選ばれる理由</h2>
        <div className={styles.grid}>
          {strengths.map((s) => (
            <div key={s.title} className={styles.item}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}