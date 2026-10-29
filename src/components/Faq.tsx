import common from "@/styles/common.module.css";
import styles from "./Faq.module.css";
import { faqs } from "@/data/business";

// FAQの構造化データ（Googleの検索結果向け）
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// 「よくある質問」セクション
export default function Faq() {
  return (
    <section id="faq" className={`${common.section} ${common.tinted}`}>
      <div className={`${common.container} ${styles.layout}`}>
        <h2 className={common.title}>よくある質問</h2>
        <div className={styles.list}>
          {/* details / summary で、JavaScriptなしの開閉式にする */}
          {faqs.map((f) => (
            <details key={f.q} className={styles.item}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* 構造化データを埋め込む（画面には表示されない） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}