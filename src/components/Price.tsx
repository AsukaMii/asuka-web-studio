import common from "@/styles/common.module.css";
import styles from "./Price.module.css";
import { prices, deliveries } from "@/data/business";

// 「料金・納期の目安」セクション
export default function Price() {
  return (
    <section id="price" className={`${common.section} ${common.tinted}`}>
      <div className={common.container}>
        <h2 className={common.title}>料金・納期の目安</h2>
        <div className={styles.wrap}>
          {/* 料金表は table で作る（行と列の意味があるデータなので） */}
          <table className={styles.table}>
            <caption>料金（税込）</caption>
            <tbody>
              {prices.map((p) => (
                <tr key={p.name}>
                  <th scope="row">
                    {p.name}
                    <small>{p.note}</small>
                  </th>
                  <td>{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.delivery}>
            <p className={styles.deliveryTitle}>納期</p>
            <dl>
              {deliveries.map((d) => (
                <div key={d.name} className={styles.deliveryRow}>
                  <dt>{d.name}</dt>
                  <dd>{d.term}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.note}>
              内容やボリュームによって変わります。お見積もりは無料です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}