import styles from "./DemoBanner.module.css";

// ページ上部に表示する「デモサイト」のお知らせ
export default function DemoBanner() {
  return (
    <p className={styles.banner}>
      このサイトはポートフォリオ用のデモです。掲載している料金・サービス内容は架空のもので、実際のご依頼は受け付けていません。
    </p>
  );
}