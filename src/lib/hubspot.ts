// HubSpot CRM API とやり取りする処理をまとめたファイル

// コンタクト（顧客）のAPIのURL
const CONTACTS_URL = "https://api.hubapi.com/crm/v3/objects/contacts";

// 登録する問い合わせの型（TypeScriptで、受け取るデータの形を決めておく）
export type Inquiry = {
  name: string; // お名前
  email: string; // メールアドレス
  detail: string; // 相談内容
};

// 戻り値の型：成功したか、どのコンタクトか、新規か更新か
type Result =
  | { ok: true; id: string; isNew: boolean }
  | { ok: false; error: string };

// HubSpot API を呼ぶときの共通ヘッダー
function headers() {
  return {
    Authorization: `Bearer ${process.env.HUBSPOT_SERVICE_KEY}`,
    "Content-Type": "application/json",
  };
}

// 問い合わせをHubSpotに登録する
// ・初めてのメールアドレス → 新しいコンタクトを作る
// ・すでに登録済みのメールアドレス → そのコンタクトの「問い合わせ内容」を更新する
export async function saveInquiry({ name, email, detail }: Inquiry): Promise<Result> {
  if (!process.env.HUBSPOT_SERVICE_KEY) {
    return { ok: false, error: "HUBSPOT_SERVICE_KEY が設定されていません。" };
  }

  // HubSpotに送る項目（キーはプロパティの内部名）
  const properties = {
    email,
    firstname: name, // 姓名を分けずに「名」の欄に入れる
    inquiry_detail: detail, // 自分で作った「問い合わせ内容」プロパティ
  };

  // まずは新規作成を試す
  const createRes = await fetch(CONTACTS_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ properties }),
  });

  if (createRes.ok) {
    const data = await createRes.json();
    return { ok: true, id: data.id, isNew: true };
  }

  // 409（Conflict）＝同じメールアドレスのコンタクトがすでにある
  // → メールアドレスで指定して、内容を更新する
  if (createRes.status === 409) {
    const updateRes = await fetch(
      `${CONTACTS_URL}/${encodeURIComponent(email)}?idProperty=email`,
      {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify({ properties }),
      }
    );

    if (updateRes.ok) {
      const data = await updateRes.json();
      return { ok: true, id: data.id, isNew: false };
    }

    console.error("HubSpot update error:", await updateRes.text());
    return { ok: false, error: "コンタクトの更新に失敗しました。" };
  }

  // それ以外のエラー（キーが違う、スコープが足りない など）
  console.error("HubSpot create error:", createRes.status, await createRes.text());
  return { ok: false, error: "コンタクトの登録に失敗しました。" };
}