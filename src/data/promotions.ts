// Phase D 施策データ集約 — 北の逸品堂 EC (商談用モック)
// 定期便 / ポイント / クロスセル / しきい値ギフト / 増量階段 / 予約販売 /
// 紹介割 / 誕生月クーポン / 配送日明示 / 再入荷通知 の10施策を1ファイルに集約。
// slug は products.ts の curated slug と整合。本番では RATIO 管理画面から取得想定。

// ── 型定義 ──────────────────────────────────────────────

export type SubscriptionPlan = {
  slug: string;
  title: string;
  normalPrice: number;
  subPrice: number;
  discount: string;
  interval: string;
  note: string;
};

export type VolumeStep = {
  weight: string;
  price: number;
  perKg: number;
  slug: string;
  popular?: boolean;
};

export type CrossSell = {
  slug: string;
  recommends: string[];
};

export type PointsInfo = {
  rate: string;
  rateValue: number;
  sampleBalance: number;
  expiry: string;
  usage: string[];
  note: string;
};

export type ThresholdGift = {
  threshold: number;
  thresholdLabel: string;
  giftName: string;
  description: string;
  note: string;
};

export type PreOrder = {
  slug: string;
  title: string;
  preOrderPrice: number;
  normalPrice: number;
  discount: string;
  shipFrom: string;
  shipTo: string;
  orderDeadline: string;
  note: string;
};

export type Referral = {
  referrerReward: number;
  refereeReward: number;
  rewardLabel: string;
  steps: string[];
  note: string;
};

export type BirthdayCoupon = {
  amount: number;
  amountLabel: string;
  validDays: number;
  description: string;
  note: string;
};

export type DeliveryStage = {
  stage: string;
  days: string;
  detail: string;
};

export type DeliveryEstimate = {
  model: DeliveryStage[];
  totalLabel: string;
  cutoffNote: string;
  note: string;
};

export type RestockTarget = {
  slug: string;
  title: string;
  expectedRestock: string;
};

export type RestockInfo = {
  channel: string;
  description: string;
  steps: string[];
  targets: RestockTarget[];
  note: string;
};

// ── 1. 定期便 (subscription) ───────────────────────────

export const subscriptions: SubscriptionPlan[] = [
  {
    slug: 'asparagus-1kg',
    title: '朝採りアスパラ 毎月便',
    normalPrice: 5800,
    subPrice: 5220,
    discount: '10%OFF',
    interval: '毎月（旬の5〜6月のみ）',
    note: '収穫最盛期の2回をまとめてお届け。次回分はマイページからいつでも解約・スキップできます。',
  },
  {
    slug: 'potato-onion-set',
    title: 'じゃがいも・玉ねぎ 隔月便',
    normalPrice: 3980,
    subPrice: 3680,
    discount: '約8%OFF',
    interval: '隔月（年6回）',
    note: '常備野菜を切らさない定番便。お届け間隔の変更・解約は自由、違約金はありません。',
  },
  {
    slug: 'potato-8kg',
    title: 'じゃがいも 食べ比べ 季節便',
    normalPrice: 4200,
    subPrice: 3990,
    discount: '5%OFF',
    interval: '3か月ごと（年4回）',
    note: '品種を変えて旬を楽しむ食べ比べ便。1回だけのお試し利用後の解約もOKです。',
  },
];

// ── 2. ポイント (points) ───────────────────────────────

export const pointsInfo: PointsInfo = {
  rate: '1%',
  rateValue: 0.01,
  sampleBalance: 480,
  expiry: '最終購入から1年',
  usage: [
    'お買い物時に1ポイント=1円として利用可能',
    '次回注文のカート画面で利用ポイントを指定',
    '送料・熨斗代にも充当できます',
  ],
  note: '購入金額（税込）の1%が自動付与。会員登録ですぐにご利用いただけます。',
};

// ── 3. クロスセル (crossSell) ──────────────────────────

export const crossSell: CrossSell[] = [
  {
    slug: 'asparagus-1kg',
    recommends: ['potato-onion-set', 'potato-8kg', 'patagonia-r1-air-hoodie'],
  },
  {
    slug: 'potato-onion-set',
    recommends: ['asparagus-1kg', 'potato-8kg', 'potato-danshaku-30kg'],
  },
  {
    slug: 'potato-8kg',
    recommends: ['potato-onion-set', 'potato-danshaku-30kg', 'asparagus-1kg'],
  },
  {
    slug: 'potato-danshaku-30kg',
    recommends: ['potato-onion-set', 'potato-8kg', 'asparagus-1kg'],
  },
  {
    slug: 'patagonia-r1-air-hoodie',
    recommends: ['patagonia-r1-zip-neck', 'asparagus-1kg'],
  },
  {
    slug: 'patagonia-r1-zip-neck',
    recommends: ['patagonia-r1-air-hoodie', 'potato-onion-set'],
  },
];

// ── 4. しきい値ギフト (thresholdGift) ──────────────────

export const thresholdGift: ThresholdGift = {
  threshold: 10000,
  thresholdLabel: '¥10,000以上',
  giftName: '店主のおまけ',
  description:
    '合計¥10,000以上のお買い上げで、その時期いちばん美味しい畑の野菜や手書きのレシピカードを一品添えてお送りします。中身は届いてからのお楽しみ。',
  note: 'カートが条件を満たすと自動で適用。在庫状況によりおまけの品は変わります。',
};

// ── 5. 増量階段 (volumeLadder) ─────────────────────────

export const volumeLadder: VolumeStep[] = [
  { weight: '1kg', price: 5800, perKg: 5800, slug: 'asparagus-1kg' },
  { weight: '1.5kg', price: 8100, perKg: 5400, slug: 'asparagus-1kg' },
  { weight: '2kg', price: 10200, perKg: 5100, slug: 'asparagus-1kg', popular: true },
  { weight: '4kg', price: 19200, perKg: 4800, slug: 'asparagus-1kg' },
  { weight: '8kg', price: 35200, perKg: 4400, slug: 'asparagus-1kg' },
];

// ── 6. 予約販売 (preOrder) ─────────────────────────────

export const preOrders: PreOrder[] = [
  {
    slug: 'potato-8kg',
    title: '秋じゃがいも 青田買い予約',
    preOrderPrice: 3780,
    normalPrice: 4200,
    discount: '10%OFF',
    shipFrom: '畑（収穫前）',
    shipTo: '2026年10月上旬 出荷予定',
    orderDeadline: '2026年8月31日まで',
    note: '収穫前の今だけの予約価格。掘りたてを順次出荷します。天候により出荷時期が前後する場合があります。',
  },
  {
    slug: 'potato-onion-set',
    title: '新玉ねぎ 青田買い予約',
    preOrderPrice: 3580,
    normalPrice: 3980,
    discount: '10%OFF',
    shipFrom: '畑（収穫前）',
    shipTo: '2026年9月中旬 出荷予定',
    orderDeadline: '2026年8月15日まで',
    note: '貯蔵前の新玉ねぎを予約価格で確保。数量限定、予定数に達し次第締め切ります。',
  },
];

// ── 7. 紹介割 (referral) ───────────────────────────────

export const referral: Referral = {
  referrerReward: 500,
  refereeReward: 500,
  rewardLabel: '500円OFFクーポン',
  steps: [
    'マイページから紹介リンクを発行',
    'お友だちがリンク経由で初回購入',
    '紹介した方・された方の双方に500円OFFを進呈',
  ],
  note: '紹介された方は初回注文時、紹介した方は次回注文時に利用できます。',
};

// ── 8. 誕生月クーポン (birthdayCoupon) ─────────────────

export const birthdayCoupon: BirthdayCoupon = {
  amount: 800,
  amountLabel: '800円OFF',
  validDays: 30,
  description:
    '会員情報にお誕生月をご登録いただくと、その月に800円OFFクーポンをお届け。自分へのご褒美に旬の一品をどうぞ。',
  note: '誕生月の1日に自動配布、月末まで有効。¥3,000以上のご注文で利用可能です。',
};

// ── 9. 配送日明示 (deliveryEstimate) ───────────────────

export const deliveryEstimate: DeliveryEstimate = {
  model: [
    { stage: 'ご注文', days: 'Day 0', detail: 'ご注文確定・決済完了' },
    { stage: '出荷', days: 'Day 1', detail: '産地で収穫・梱包し冷蔵便で発送' },
    { stage: 'お届け', days: 'Day 2〜3', detail: '本州は中1〜2日でお手元へ' },
  ],
  totalLabel: '最短 中1日でお届け',
  cutoffNote: '午前10時までのご注文は当日出荷対象（収穫状況により変動）',
  note: '配送日数は地域により異なります。沖縄・離島は追加で1〜2日いただきます。',
};

// ── 10. 再入荷通知 (restock) ───────────────────────────

export const restockInfo: RestockInfo = {
  channel: 'LINE',
  description:
    '売り切れ商品の「再入荷をLINEで知らせる」ボタンから登録すると、入荷した瞬間にLINEへ通知が届きます。人気の旬商品を逃しません。',
  steps: [
    '商品ページの「再入荷通知」ボタンをタップ',
    '公式LINEを友だち追加',
    '入荷したらLINEでお知らせ',
  ],
  targets: [
    { slug: 'asparagus-1kg', title: '朝採りアスパラガス 1kg 化粧箱', expectedRestock: '次回収穫分 入荷待ち' },
    { slug: 'potato-danshaku-30kg', title: '男爵じゃがいも 30kg', expectedRestock: '秋の新じゃが入荷時' },
    { slug: 'patagonia-r1-zip-neck', title: "M's R1 Air Zip-Neck", expectedRestock: '入荷未定（一点物）' },
  ],
  note: 'アパレルは一点物のため再入荷しない場合があります。',
};
