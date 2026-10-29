import common from "@/styles/common.module.css";
import styles from "./Profile.module.css";
import { business, profile } from "@/data/business";

// 「制作者について」セクション
export default function Profile() {
  return (
    <section className={common.section}>
      <div className={common.container}>
        <div className={styles.card}>
          {/* 顔写真やイラストに差し替える想定 */}
          <div className={styles.avatar} aria-hidden="true">
            A
          </div>
          <div>
            <h2 className={styles.name}>
              制作者 {business.owner}
              <span>{profile.role}</span>
            </h2>
            <p className={styles.text}>{profile.text}</p>
            <ul className={styles.skills}>
              {profile.skills.map((s) => (
                <li key={s.name}>
                  {s.name}
                  <strong>{s.years}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}