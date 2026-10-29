import common from "@/styles/common.module.css";
import styles from "./Contact.module.css";
import { business } from "@/data/business";

// 「お問い合わせ」セクション
export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={`${common.container} ${styles.inner}`}>
        <div>
          <h2 className={styles.title}>まずは気軽にご相談ください</h2>
          <p className={styles.lead}>
            「何から決めればいいかわからない」段階でも大丈夫です。
            <br />
            {business.responseTime}
          </p>
        </div>
        <div className={styles.actions}>
          {/* mailto: でメールソフトが開く */}
          <a href={`mailto:${business.email}`} className={styles.btn}>
            メールで相談する
          </a>
          <p className={styles.meta}>
            チャットでの相談窓口は準備中です
            <br />
            打ち合わせ：{business.meeting}
          </p>
        </div>
      </div>
    </section>
  );
}