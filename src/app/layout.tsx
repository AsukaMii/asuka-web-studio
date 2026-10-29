import type { Metadata } from "next";
// Google Fonts を Next.js の仕組みで読み込む（自動で最適化される）
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

// 本文・見出し共通フォント：硬すぎず丸すぎない角ゴシック
const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-zen", // CSS変数として使えるようにする
});

// <title> と <meta name="description"> になる（WordPressのSEOプラグインの役割）
export const metadata: Metadata = {
  title: "Asuka Web Studio｜WordPress・LP制作、フロントエンド実装",
  description:
    "WordPressサイト制作、LP制作、フロントエンド実装、既存サイトの修正・保守、表示速度改善まで対応する個人のWeb制作。全国リモート対応。",
};

// 全ページ共通の外枠。children に各ページ（page.tsx）の中身が入る
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={zenKaku.variable}>
      <body>{children}</body>
    </html>
  );
}