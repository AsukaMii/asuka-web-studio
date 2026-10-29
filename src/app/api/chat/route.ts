import { anthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages, tool, isStepCount, type UIMessage } from "ai";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/systemPrompt";
import { saveInquiry } from "@/lib/hubspot";

// 使用するモデル（高速・低価格なHaiku）
const MODEL = "claude-haiku-5-5";

// 使いすぎ防止のための上限
const MAX_MESSAGES = 20; // 送ってよい会話の件数
const MAX_CHARS = 500; // 1メッセージあたりの最大文字数

// ストリーミングの最大実行時間（秒）
export const maxDuration = 30;

export async function POST(req: Request) {
  // APIキーが設定されていない場合は、わかりやすいエラーを返す
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY が設定されていません。.env.local を確認してください。" },
      { status: 500 }
    );
  }

  // useChat からは、それまでの会話がまとめて messages として送られてくる
  const { messages }: { messages: UIMessage[] } = await req.json();

  // 形式チェック
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "メッセージが空です。" }, { status: 400 });
  }

  // 会話が長すぎる場合は受け付けない
  if (messages.length > MAX_MESSAGES) {
    return Response.json(
      { error: "会話が長くなったため、ページを再読み込みして新しく始めてください。" },
      { status: 400 }
    );
  }

  // 1メッセージの文字数チェック（テキスト部分だけを数える）
  const tooLong = messages.some((m) =>
    m.parts.some((p) => p.type === "text" && p.text.length > MAX_CHARS)
  );
  if (tooLong) {
    return Response.json(
      { error: `メッセージは${MAX_CHARS}文字以内で入力してください。` },
      { status: 400 }
    );
  }

  // Claude APIに送信し、返答をストリーミングで返す
  const result = streamText({
    model: anthropic(MODEL),
    instructions: buildSystemPrompt(),
    // 画面用のメッセージ形式を、AIに送る形式に変換する
    messages: await convertToModelMessages(messages),

    // AIが使えるツール（道具）
    tools: {
      createInquiry: tool({
        // いつ使う道具なのかをAIに説明する（AIはこれを読んで使うか判断する）
        description:
          "お客様の問い合わせをCRMに登録する。お名前・メールアドレス・相談内容の3つがそろい、お客様が登録に同意したときだけ使う。",
        // AIが渡すデータの形（zodでチェックされる）
        inputSchema: z.object({
          name: z.string().min(1).describe("お客様のお名前"),
          email: z.email().describe("お客様のメールアドレス"),
          detail: z.string().min(1).describe("相談内容の要約（種類・予算・納期・要望など）"),
        }),
        // 実際の処理（サーバー側で実行される。AIにはこの中身は見えない）
        execute: async ({ name, email, detail }) => {
          const result = await saveInquiry({ name, email, detail });
          // AIには、成功したかどうかだけを返す
          return result.ok
            ? { success: true, message: "登録しました。" }
            : { success: false, message: "登録に失敗しました。" };
        },
      }),
    },

    // ツールを使ったあと、その結果をもとにAIがもう一度返答できるようにする
    // （最大3ステップ：返答 → ツール実行 → 結果をふまえた返答）
    stopWhen: isStepCount(3),

    maxOutputTokens: 600, // 返答の長さの上限（料金の上限にもなる）
  });

  // useChat が受け取れる形式で、少しずつ返す
  return result.toUIMessageStreamResponse();
}