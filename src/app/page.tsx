// CSS Modules：styles.クラス名 の形で使う
import styles from "./page.module.css";
import { business } from "@/data/business";
import ChatWidget from "@/components/ChatWidget";
// セクションのコンポーネント
import Worries from "@/components/Worries";
import Strengths from "@/components/Strengths";
import Services from "@/components/Services";
import Works from "@/components/Works";
import Profile from "@/components/Profile";
import Price from "@/components/Price";
import Flow from "@/components/Flow";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* ↑ <> </> は「フラグメント」。余計なdivを増やさずに複数の要素をまとめる */}

      {/* ===== ヘッダー ===== */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.logo}>
            {business.name}
          </a>
          <nav className={styles.nav} aria-label="メインメニュー">
            <a href="#services">サービス</a>
            <a href="#works">実績</a>
            <a href="#price">料金</a>
            <a href="#faq">よくある質問</a>
            <a href="#contact" className={styles.navCta}>
              無料で相談する
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ===== ファーストビュー ===== */}
        <section className={styles.hero}>
          {/* クラスを2つ付けるときはテンプレート文字列でつなぐ */}
          <div className={`${styles.container} ${styles.heroInner}`}>
            <div className={styles.heroText}>
              <p className={styles.heroNote}>個人のWeb制作・{business.area}</p>
              <h1 className={styles.heroTitle}>
                {/* 文節の途中で改行されないよう、まとまりごとに区切る */}
                <span>はじめての</span>
                <span>Web制作も、</span>
                <br />
                <span>ひとりの担当者が</span>
                <span>最後まで。</span>
              </h1>
              <p className={styles.heroLead}>{business.lead}</p>
              <div className={styles.heroActions}>
                <a href="#contact" className={styles.btnPrimary}>
                  無料で相談する
                </a>
                <a href="#price" className={styles.btnSecondary}>
                  料金を見る
                </a>
              </div>
              <ul className={styles.heroFacts}>
                <li>
                  <strong>11年</strong>HTML/CSS歴
                </li>
                <li>
                  <strong>1ヶ月</strong>公開後の無料サポート
                </li>
                <li>
                  <strong>1時間〜</strong>小さな修正もOK
                </li>
              </ul>
            </div>

            {/* 納品イメージ：架空のパン屋サイト＋チャットウィジェット */}
            {/* aria-hidden="true" は読み上げソフトに読ませない（飾りなので） */}
            <figure className={styles.showcase} aria-label="制作イメージ">
              <div className={styles.browser}>
                <div className={styles.browserBar}>
                  <span className={styles.dots} aria-hidden="true" />
                  <span className={styles.url}>hidamari-bakery.jp</span>
                </div>
                <div className={styles.site}>
                  <div className={styles.siteNav}>
                    <span className={styles.siteLogo}>ひだまりベーカリー</span>
                    <span className={styles.siteMenu} aria-hidden="true" />
                  </div>
                  <div className={styles.siteHero}>
                    <p>毎朝6時、焼きたてから。</p>
                    <span className={styles.siteBtn}>本日のパン</span>
                  </div>
                  <div className={styles.siteItems} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>

              {/* 右下のチャット（ふきだしは読み込み時に1回だけ順に表示） */}
              <div className={styles.chat}>
                <p className={styles.chatHead}>ひだまりベーカリー サポート</p>
                <p className={`${styles.msg} ${styles.msgBot}`}>
                  こんにちは！ご質問があればどうぞ。
                </p>
                <p className={`${styles.msg} ${styles.msgUser}`}>
                  予約の受け取りは何時からですか？
                </p>
                <p className={`${styles.msg} ${styles.msgBot}`}>
                  朝7時からお渡しできます。
                </p>
              </div>
              <figcaption className={styles.caption}>
                制作イメージ：店舗サイト＋AIチャット
              </figcaption>
            </figure>
          </div>
        </section>
        {/* ===== お悩み・選ばれる理由 ===== */}
        <Worries />
        <Strengths />
        {/* ===== できること・実績 ===== */}
        <Services />
        <Works />
        {/* ===== 制作者について・料金 ===== */}
        <Profile />
        <Price />
        {/* ===== 流れ・FAQ ===== */}
        <Flow />
        <Faq />
        {/* ===== お問い合わせ ===== */}
        <Contact />
      </main>
      {/* ===== フッター ===== */}
      <Footer />
      {/* ===== 右下のチャットウィジェット ===== */}
      <ChatWidget />
    </>
  );
}