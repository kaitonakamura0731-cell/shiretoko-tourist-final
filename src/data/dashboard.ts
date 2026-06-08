// 運用ダッシュボード モックデータ
// 店主向け管理画面イメージ用。実データ接続前のUIプレビュー用途
// 想定: 月商 30-80万 / 月間注文数 50-150 / LINE登録 300-800

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
    value: "¥38,400",
    delta: "+12.3%",
    trend: "up",
    hint: "前日比 ¥34,200 → ¥38,400",
  },
  {
    label: "今日の注文数",
    value: "6 件",
    delta: "+2 件",
    trend: "up",
    hint: "前日 4 件",
  },
  {
    label: "今月の売上",
    value: "¥624,800",
    delta: "+8.4%",
    trend: "up",
    hint: "前年同月 ¥576,300",
  },
  {
    label: "今月の注文数",
    value: "94 件",
    delta: "+11 件",
    trend: "up",
    hint: "前年同月 83 件",
  },
  {
    label: "客単価",
    value: "¥6,647",
    delta: "-2.1%",
    trend: "down",
    hint: "前月 ¥6,790",
  },
  {
    label: "会員 / 非会員比",
    value: "62 / 38",
    trend: "flat",
    hint: "会員注文 58 件 / 非会員 36 件",
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
    value: "78%",
    trend: "up",
    hint: "目標 ¥800,000 に対し ¥624,800",
  },
];

// ========================================
// LINE 指標
// ========================================
export const lineKpis: Kpi[] = [
  {
    label: "LINE 登録者数",
    value: "542 人",
    delta: "+18 人",
    trend: "up",
    hint: "先週 524 人",
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
    value: "9 件",
    delta: "+2 件",
    trend: "up",
    hint: "直近7日。未返信 1 件",
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
    value: "14 件",
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

export const productRows: ProductRow[] = [
  {
    slug: "asparagus-2kg",
    title: "知床産 グリーンアスパラ 2.0kg",
    sales: 187200,
    orders: 36,
    stock: 12,
  },
  {
    slug: "asparagus-1_5kg",
    title: "知床産 グリーンアスパラ 1.5kg (化粧箱)",
    sales: 156400,
    orders: 34,
    stock: 8,
  },
  {
    slug: "asparagus-1kg",
    title: "知床産 グリーンアスパラ 1.0kg",
    sales: 98800,
    orders: 28,
    stock: 15,
  },
  {
    slug: "asparagus-4kg",
    title: "知床産 グリーンアスパラ 4.0kg (業務用)",
    sales: 86400,
    orders: 9,
    stock: 4,
  },
  {
    slug: "patagonia-r1-air-fullzip",
    title: "Patagonia M's R1エア・フルジップ・フーディ (Black)",
    sales: 54000,
    orders: 3,
    stock: 2,
  },
  {
    slug: "patagonia-nano-puff-vest",
    title: "Patagonia M's ナノ・パフ・ベスト (Conifer Green)",
    sales: 48600,
    orders: 3,
    stock: 1,
  },
  {
    slug: "patagonia-retrox-vest",
    title: "Patagonia M's クラシック・レトロX・ベスト (DNSQ)",
    sales: 42800,
    orders: 2,
    stock: 5,
  },
  {
    slug: "potato-dansyaku-30kg",
    title: "オホーツク産 男爵じゃがいも 30kg",
    sales: 39600,
    orders: 11,
    stock: 22,
  },
  {
    slug: "patagonia-granite-crest-rain",
    title: "Patagonia M's グラナイト・クレスト・レイン (Gather Green)",
    sales: 36200,
    orders: 2,
    stock: 2,
  },
  {
    slug: "patagonia-thermal-airshed",
    title: "Patagonia M's サーマル・エアシェッド・ジャケット (Smolder Blue)",
    sales: 32400,
    orders: 2,
    stock: 0,
  },
];

// 在庫アラート閾値
export const STOCK_ALERT_THRESHOLD = 3;
