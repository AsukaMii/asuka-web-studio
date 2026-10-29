// "use client" を付けると、ブラウザ側で動くコンポーネントになる
// （ボタンのクリックや入力など、操作に反応するものには必須）
"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import styles from "./ChatWidget.module.css";
import { business } from "@/data/business";

// 最初に表示する質問の候補（押すとそのまま送信される）
const suggestions = [
  "LP制作の料金はいくらですか？",
  "納期はどれくらいですか？",
  "コーディングだけの依頼もできますか？",
];

export default function ChatWidget() {
  // useState：画面の状態を覚えておく箱。値が変わると画面が自動で描き直される
  const [open, setOpen] = useState(false); // チャットが開いているか
  const [input, setInput] = useState(""); // 入力欄の文字

  // useRef：DOM要素を直接触るための目印
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // AI SDK のチャット機能（送信先は既定で /api/chat）
  // messages：会話の履歴、sendMessage：送信する関数、status：通信の状態
  const { messages, sendMessage, status, error } = useChat();

  // 返答を待っている間（送信直後〜ストリーミング中）
  const isBusy = status === "submitted" || status === "streaming";

  // useEffect：[ ] の中の値が変わったときに実行する処理
  // 新しいメッセージが来たら一番下までスクロール
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  // 開いたら入力欄にフォーカス
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Escキーで閉じる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // コンポーネントが消えるときにイベントを外す（後片付け）
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // メッセージを送信する
  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信でページが再読み込みされるのを止める
    send(input);
  };

  // Enterで送信、Shift+Enterで改行（日本語変換中のEnterは無視）
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* ===== チャット画面（open が true のときだけ表示） ===== */}
      {open && (
        <section className={styles.panel} aria-label="チャットで相談">
          <header className={styles.head}>
            <div>
              <p className={styles.headTitle}>{business.name}</p>
              <p className={styles.headSub}>AIアシスタントがお答えします</p>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="チャットを閉じる"
            >
              ×
            </button>
          </header>

          {/* aria-live：新しいメッセージを読み上げソフトに伝える */}
          <div className={styles.list} ref={listRef} aria-live="polite">
            {/* 最初のあいさつ（固定文） */}
            <p className={`${styles.msg} ${styles.bot}`}>
              こんにちは！料金や納期、依頼の流れなど、気になることをお気軽にどうぞ。
            </p>

            {/* まだ何も送っていないときは質問の候補を出す */}
            {messages.length === 0 && (
              <div className={styles.suggestions}>
                {suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* 会話の履歴（role が user なら右、それ以外は左に表示） */}
            {messages.map((m) => (
              <p
                key={m.id}
                className={`${styles.msg} ${m.role === "user" ? styles.user : styles.bot}`}
              >
                {/* メッセージは parts（部品）の配列。テキストの部品だけを表示する */}
                {m.parts.map((part, i) =>
                  part.type === "text" ? <span key={i}>{part.text}</span> : null
                )}
              </p>
            ))}

            {/* 返答待ちの「…」表示 */}
            {status === "submitted" && (
              <p className={`${styles.msg} ${styles.bot} ${styles.typing}`} aria-label="返答を作成中">
                <span />
                <span />
                <span />
              </p>
            )}

            {/* エラー時の案内 */}
            {error && (
              <p className={styles.error}>
                うまく返答できませんでした。時間をおいて再度お試しいただくか、
                <a href={`mailto:${business.email}`}>メール</a>でご連絡ください。
              </p>
            )}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="質問を入力（Enterで送信）"
              rows={1}
              maxLength={500}
              aria-label="メッセージ"
            />
            <button type="submit" disabled={isBusy || !input.trim()}>
              送信
            </button>
          </form>
          <p className={styles.notice}>
            AIによる自動回答です。正式なお見積もりは担当者からご連絡します。
          </p>
        </section>
      )}

      {/* ===== 右下の開閉ボタン ===== */}
      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? "閉じる" : "チャットで相談"}
      </button>
    </>
  );
}