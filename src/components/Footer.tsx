import styles from "./Footer.module.css";
import { business } from "@/data/business";

// フッター
export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* 年は固定値（new Date() はビルド時にエラーになるため） */}
      <small>
        © {business.since} {business.name}
      </small>
    </footer>
  );
}