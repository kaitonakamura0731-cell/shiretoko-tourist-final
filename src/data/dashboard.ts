// 運用ダッシュボード モックデータ
// 店主向け管理画面イメージ用。実データ接続前のUIプレビュー用途
// 想定: 月商 約1,000万円 / 月間注文数 1,500-2,000 / LINE登録 3,000-4,000
// 数値整合: 今月の売上 = 客単価 × 今月の注文数 / 今月の注文数 >= Top10注文数合計

export type Trend = "up" | "down" | "flat";

export type Kpi = {
  label: string;
  value: string;
  delta?: string;
  trend?: Trend;
  hint?: string;
};

// ========================================
// 売上指標 (日次・月次)
// ========================================
export const salesKpis: Kpi[] = [
  {
    label: "今日の売上",
    value: "¥372,600",
    delta: "+12.3%",
    trend: "up",
    hint: "前日比 ¥331,790 → ¥372,600",
  },
  {
    label: "今日の注文数",
    value: "58 件",
    delta: "+9 件",
    trend: "up",
    hint: "前日 49 件",
  },
  {
    label: "今月の売上",
    value: "¥10,785,600",
    delta: "+8.4%",
    trend: "up",
    hint: "前年同月 ¥9,949,815",
  },
  {
    label: "今月の注文数",
    value: "1,680 件",
    delta: "+168 件",
    trend: "up",
    hint: "前年同月 1,512 件",
  },
  {
    label: "平均注文単価",
    value: "¥6,420",
    delta: "-2.1%",
    trend: "down",
    hint: "前月 ¥6,558",
  },
  {
    label: "会員 / 非会員比",
    value: "62 / 38",
    trend: "flat",
    hint: "会員注文 1,042 件 / 非会員 638 件",
  },
  {
    label: "リピート率",
    value: "34.2%",
    delta: "+1.8pt",
    trend: "up",
    hint: "過去90日のリピート購入率",
  },
  {
    label: "月次目標達成率",
    value: "83%",
    trend: "up",
    hint: "目標 ¥13,000,000 に対し ¥10,785,600",
  },
];

// ========================================
// LINE 指標
// ========================================
export const lineKpis: Kpi[] = [
  {
    label: "LINE 登録者数",
    value: "3,840 人",
    delta: "+48 人",
    trend: "up",
    hint: "先週 3,792 人",
  },
  {
    label: "配信開封率",
    value: "48.6%",
    delta: "+3.2pt",
    trend: "up",
    hint: "直近配信「アスパラ初出荷」",
  },
  {
    label: "配信クリック率",
    value: "12.4%",
    delta: "-0.8pt",
    trend: "down",
    hint: "直近5回平均 13.1%",
  },
  {
    label: "1:1 チャット件数",
    value: "34 件",
    delta: "+6 件",
    trend: "up",
    hint: "直近7日。未返信 2 件",
  },
  {
    label: "LINE経由 売上比率",
    value: "31%",
    delta: "+4pt",
    trend: "up",
    hint: "今月売上のうち LINE 流入",
  },
];

// ========================================
// カート指標
// ========================================
export const cartKpis: Kpi[] = [
  {
    label: "現在カゴに入っている件数",
    value: "48 件",
    trend: "flat",
    hint: "未決済セッション (1時間以内)",
  },
  {
    label: "カート離脱率",
    value: "63.8%",
    delta: "-2.4pt",
    trend: "up",
    hint: "前月 66.2%。改善傾向",
  },
  {
    label: "24時間以内 回収率",
    value: "18.2%",
    delta: "+1.6pt",
    trend: "up",
    hint: "離脱からの復帰購入",
  },
  {
    label: "平均カート金額",
    value: "¥7,820",
    trend: "flat",
    hint: "決済完了分の平均",
  },
];

// ========================================
// 商品ランキング (Top 10)
// ========================================
export type ProductRow = {
  slug: string;
  title: string;
  sales: number;   // 売上金額 (円)
  orders: number;  // 注文件数
  stock: number;   // 在庫数 (3未満でアラート)
};

// 各行 sales = orders × 掲載価格 (products.ts / 増量階段の実価格)。
// orders 合計 (1,250) は KPI「今月の注文数」(1,680) を超えない。
export const productRows: ProductRow[] = [
  {
    slug: "asparagus-2kg",
    title: "知床産 グリーンアスパラ 2.0kg",
    sales: 1713600, // 168 × ¥10,200
    orders: 168,
    stock: 12,
  },
  {
    slug: "asparagus-1kg",
    title: "知床産 グリーンアスパラ 1.0kg",
    sales: 1241200, // 214 × ¥5,800
    orders: 214,
    stock: 15,
  },
  {
    slug: "asparagus-1_5kg",
    title: "知床産 グリーンアスパラ 1.5kg (化粧箱)",
    sales: 1231200, // 152 × ¥8,100
    orders: 152,
    stock: 8,
  },
  {
    slug: "asparagus-4kg",
    title: "知床産 グリーンアスパラ 4.0kg (業務用)",
    sales: 1113600, // 58 × ¥19,200
    orders: 58,
    stock: 4,
  },
  {
    slug: "potato-onion-set",
    title: "じゃがいも・玉ねぎ直送便 10kg",
    sales: 780080, // 196 × ¥3,980
    orders: 196,
    stock: 24,
  },
  {
    slug: "potato-8kg",
    title: "じゃがいも 食べ比べ 8kg",
    sales: 730800, // 174 × ¥4,200
    orders: 174,
    stock: 30,
  },
  {
    slug: "potato-danshaku-30kg",
    title: "オホーツク産 男爵じゃがいも 30kg",
    sales: 660000, // 132 × ¥5,000
    orders: 132,
    stock: 18,
  },
  {
    slug: "patagonia-r1-air-hoodie",
    title: "Patagonia M's R1エア・フルジップ・フーディ",
    sales: 488400, // 22 × ¥22,200
    orders: 22,
    stock: 12,
  },
  {
    slug: "patagonia-r1-zip-neck",
    title: "Patagonia M's R1エア・ジップネック",
    sales: 316800, // 16 × ¥19,800
    orders: 16,
    stock: 2,
  },
  {
    slug: "potato-onion-5kg",
    title: "じゃがいも・玉ねぎ直送便 5kg",
    sales: 280840, // 118 × ¥2,380
    orders: 118,
    stock: 0,
  },
];

// 在庫アラート閾値
export const STOCK_ALERT_THRESHOLD = 3;

// ============ 指標から打つ、次の一手 (アクション可能指標) ============
// 数値は既存KPIスケールに整合: カゴ48件中12人が24h超、LINE3,840人中の再入荷待ち26人 等
export type ActionTarget = { name: string; detail: string; value?: string };
export type ActionableMetric = {
  key: string;
  metricLabel: string; // 指標名
  value: string; // 現在値 (大きく表示)
  valueSub: string; // 分母等の補足
  meaning: string; // この数字の意味 (帳票として読める説明)
  action: string; // 施策の説明1行
  buttonLabel: string; // オプション確認ボタン文言
  expected: string; // 任意導入時の目安
  channel: string; // 連絡手段
  targets: ActionTarget[]; // 対象者サンプル (イニシャル表記)
  totalTargets: number;
  mailSubject: string;
  mailBody: string; // 冒頭プレビュー
};

export const actionableMetrics: ActionableMetric[] = [
  {
    key: "cart-abandon",
    metricLabel: "カート離脱",
    value: "12人",
    valueSub: "カゴ全体 48件中",
    meaning: "カゴに商品を入れたまま24時間以上動きがないお客様です。",
    action: "カート限定クーポン(¥500 OFF)を添える案です。自動送信はオプション導入時の機能です。",
    buttonLabel: "クーポン案を確認",
    expected: "任意導入時の目安: 回収 ¥30,000前後",
    channel: "メール",
    targets: [
      { name: "S・T様", detail: "朝採りアスパラ 1kg 他1点", value: "¥8,200" },
      { name: "K・M様", detail: "Patagonia R1 Air Hoodie (M)", value: "¥27,800" },
      { name: "A・I様", detail: "じゃがいも・玉ねぎ直送便 10kg", value: "¥3,980" },
      { name: "Y・O様", detail: "朝採りアスパラ 2kg 化粧箱", value: "¥5,800" },
      { name: "R・H様", detail: "オホーツク鮭フレーク 170g 他2点", value: "¥4,640" },
    ],
    totalTargets: 12,
    mailSubject: "お買い忘れはありませんか — カート限定クーポンのご案内",
    mailBody: "カゴに入れていただいた商品を、店主がお取り置きしています。\nクーポンコード CART500(¥500 OFF)をご用意しました。\n収穫期の商品は数に限りがあります。お早めにどうぞ。",
  },
  {
    key: "restock-notify",
    metricLabel: "再入荷待ち",
    value: "26人",
    valueSub: "通知登録ベース",
    meaning: "売り切れ商品に「再入荷したら知らせて」と登録済みのお客様です。",
    action: "入荷が確定した商品の通知案です。LINE/メールの自動配信はオプション扱いです。",
    buttonLabel: "入荷通知案を確認",
    expected: "任意導入時の目安: 通知経由の購入率30%",
    channel: "LINE / メール",
    targets: [
      { name: "M・K様", detail: "Patagonia R1 Air Hoodie (M)" },
      { name: "T・S様", detail: "Patagonia R1 Air Hoodie (M)" },
      { name: "H・N様", detail: "朝採りアスパラ 8.0kg" },
      { name: "J・W様", detail: "Patagonia R1 Air Zip-Neck (S)" },
      { name: "E・F様", detail: "朝採りアスパラ 4.0kg" },
    ],
    totalTargets: 26,
    mailSubject: "再入荷のお知らせ — お待たせしました",
    mailBody: "お待ちいただいていた商品が入荷しました。\n1点物・収穫期の商品はなくなり次第終了です。\n商品ページからそのままご購入いただけます。",
  },
  {
    key: "rank-nudge",
    metricLabel: "ランク昇格間近",
    value: "9人",
    valueSub: "Gold昇格まで平均 あと¥4,200",
    meaning: "あと少しのお買い物でGoldランク(常時10%OFF)に届く会員です。",
    action: "「あと¥◯◯でGold」の案内文です。自動送信は追加オプションです。",
    buttonLabel: "ランク案内を確認",
    expected: "任意導入時の目安: 昇格後の継続購入増",
    channel: "メール",
    targets: [
      { name: "N・Y様", detail: "あと¥3,200でGold" },
      { name: "O・T様", detail: "あと¥4,800でGold" },
      { name: "S・A様", detail: "あと¥1,900でGold" },
      { name: "F・M様", detail: "あと¥5,400でGold" },
      { name: "W・K様", detail: "あと¥5,700でGold" },
    ],
    totalTargets: 9,
    mailSubject: "Goldランクまで、あと少しです",
    mailBody: "いつもご利用ありがとうございます。\nあと少しのお買い物で、常時10%OFFのGoldランクに到達します。\n旬のおすすめを商品ページにまとめました。",
  },
  {
    key: "sub-skip-follow",
    metricLabel: "定期便スキップ連続",
    value: "4人",
    valueSub: "2回連続スキップ中",
    meaning: "定期便を2回続けてスキップしている会員。解約の予兆です。",
    action: "量・間隔の見直し案内です。自動フォローは追加オプションです。",
    buttonLabel: "フォロー案を確認",
    expected: "任意導入時の目安: 解約抑止",
    channel: "LINE / メール",
    targets: [
      { name: "I・S様", detail: "アスパラ毎月便 (2.0kg)" },
      { name: "U・M様", detail: "アスパラ毎月便 (1.0kg)" },
      { name: "C・H様", detail: "じゃがいも隔月便 (10kg)" },
      { name: "B・R様", detail: "アスパラ毎月便 (1.5kg)" },
    ],
    totalTargets: 4,
    mailSubject: "お届けの量・間隔、見直しませんか",
    mailBody: "定期便のご利用ありがとうございます。\n量が多い・間隔が短いなどあれば、1分で変更できます。\nスキップ・解約もマイページからいつでも可能です。",
  },
];
