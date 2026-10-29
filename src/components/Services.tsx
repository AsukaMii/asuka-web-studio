import common from "@/styles/common.module.css";
import styles from "./Services.module.css";
import { services } from "@/data/business";

// 「できること」セクション
export default function Services() {
  return (
    // id="services" はヘッダーのリンク（#services）の飛び先
    <section id="services" className={`${common.section} ${common.tinted}`}>
      <div className={common.container}>
        <h2 className={common.title}>できること</h2>
        {/* 項目名と説明の組なので、dl（定義リスト）で表す */}
        <dl className={styles.list}>
          {services.map((s) => (
            <div key={s.title} className={styles.row}>
              <dt>{s.title}</dt>
              <dd>{s.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}