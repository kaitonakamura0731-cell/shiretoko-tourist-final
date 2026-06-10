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
