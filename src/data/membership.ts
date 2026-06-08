// 会員プログラム — 北の逸品堂 マイページ モックデータ
// 本番では RATIO 管理画面の顧客マスタ + 注文履歴から取得する想定。

export type RankBenefit = {
  type: 'shipping_free' | 'shipping_discount' | 'discount' | 'early_access' | 'birthday_coupon' | 'referral';
  label: string;
};

export type Rank = {
  id: string;
  name: string;
  threshold: number; // この金額以上で到達 (累計購入額)
  benefits: RankBenefit[];
  storyNote: string; // 店主のメッセージ (約30字)
  color: string; // ランクカラー (HEX)
};

export type OrderHistory = {
  date: string; // YYYY-MM-DD
  items: { slug: string; title: string; qty: number; price: number }[];
  total: number;
};

export type Customer = {
  id: string;
  name: string;
  rank: string; // Rank.id
  totalSpent: number; // 累計購入額 (税抜)
  joinedAt: string; // YYYY-MM-DD
  history: OrderHistory[];
};

export const ranks: Rank[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    threshold: 0,
    color: '#B08D57',
    storyNote: '初めまして。知床の畑からよろしくお願いします。',
    benefits: [
      { type: 'shipping_discount', label: '送料5%OFF (¥5,000以上のお買い物)' },
      { type: 'birthday_coupon', label: '誕生月クーポン ¥500' },
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    threshold: 30000,
    color: '#9AA0A6',
    storyNote: 'いつもありがとうございます。旬の便りをお届けします。',
    benefits: [
      { type: 'shipping_free', label: '送料無料 (全商品)' },
      { type: 'discount', label: '全商品5%OFF' },
      { type: 'birthday_coupon', label: '誕生月クーポン ¥1,000' },
      { type: 'referral', label: 'ご紹介で双方に¥1,500分のポイント' },
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    threshold: 100000,
    color: '#B99253',
    storyNote: '畑から最初の便りをお届けする、いちばん近しいお客様。',
    benefits: [
      { type: 'shipping_free', label: '送料無料 (全商品)' },
      { type: 'discount', label: '全商品10%OFF' },
      { type: 'early_access', label: '限定品・新作の先行販売 (一般公開3日前)' },
      { type: 'birthday_coupon', label: '誕生月クーポン ¥2,000' },
      { type: 'referral', label: 'ご紹介で双方に¥3,000分のポイント' },
    ],
  },
];

// サンプル顧客 (デモ用 3名)
export const customers: Customer[] = [
  {
    id: 'cust-001',
    name: '山田 太郎',
    rank: 'bronze',
    totalSpent: 12000,
    joinedAt: '2026-02-14',
    history: [
      {
        date: '2026-02-14',
        items: [
          { slug: 'asparagus-1kg', title: '朝採りアスパラガス 1kg 化粧箱', qty: 1, price: 5800 },
        ],
        total: 5800,
      },
      {
        date: '2026-04-02',
        items: [
          { slug: 'potato-8kg', title: 'じゃがいも 食べ比べ8kg', qty: 1, price: 4200 },
        ],
        total: 4200,
      },
      {
        date: '2026-05-20',
        items: [
          { slug: 'potato-onion-set', title: 'じゃがいも・玉ねぎ直送便 10kg', qty: 0, price: 3980 },
        ],
        total: 2000, // 一部商品 (ギフト分割)
      },
    ],
  },
  {
    id: 'cust-002',
    name: '田中 花子',
    rank: 'silver',
    totalSpent: 48000,
    joinedAt: '2025-09-10',
    history: [
      {
        date: '2025-09-10',
        items: [
          { slug: 'potato-onion-set', title: 'じゃがいも・玉ねぎ直送便 10kg', qty: 2, price: 3980 },
        ],
        total: 7960,
      },
      {
        date: '2025-11-22',
        items: [
          { slug: 'patagonia-r1-zip-neck', title: 'Patagonia M\'s R1 エア・ジップネック', qty: 1, price: 19800 },
        ],
        total: 19800,
      },
      {
        date: '2026-02-18',
        items: [
          { slug: 'potato-8kg', title: 'じゃがいも 食べ比べ8kg', qty: 2, price: 4200 },
          { slug: 'asparagus-1kg', title: '朝採りアスパラガス 1kg 化粧箱', qty: 1, price: 5800 },
        ],
        total: 14200,
      },
      {
        date: '2026-05-30',
        items: [
          { slug: 'asparagus-1kg', title: '朝採りアスパラガス 1kg 化粧箱', qty: 1, price: 5800 },
        ],
        total: 6040,
      },
    ],
  },
  {
    id: 'cust-003',
    name: '鈴木 一郎',
    rank: 'gold',
    totalSpent: 158000,
    joinedAt: '2025-04-05',
    history: [
      {
        date: '2025-04-05',
        items: [
          { slug: 'patagonia-r1-air-hoodie', title: 'Patagonia M\'s R1 エア・フルジップ・フーディ', qty: 1, price: 22200 },
        ],
        total: 22200,
      },
      {
        date: '2025-07-12',
        items: [
          { slug: 'potato-danshaku-30kg', title: '北海道オホーツク産 男爵じゃがいも 30kg', qty: 1, price: 5000 },
          { slug: 'asparagus-1kg', title: '朝採りアスパラガス 1kg 化粧箱', qty: 3, price: 5800 },
        ],
        total: 22400,
      },
      {
        date: '2025-10-30',
        items: [
          { slug: 'patagonia-r1-zip-neck', title: 'Patagonia M\'s R1 エア・ジップネック', qty: 2, price: 19800 },
        ],
        total: 39600,
      },
      {
        date: '2026-01-15',
        items: [
          { slug: 'potato-8kg', title: 'じゃがいも 食べ比べ8kg', qty: 3, price: 4200 },
          { slug: 'potato-onion-set', title: 'じゃがいも・玉ねぎ直送便 10kg', qty: 2, price: 3980 },
        ],
        total: 20560,
      },
      {
        date: '2026-05-08',
        items: [
          { slug: 'patagonia-r1-air-hoodie', title: 'Patagonia M\'s R1 エア・フルジップ・フーディ', qty: 1, price: 22200 },
          { slug: 'asparagus-1kg', title: '朝採りアスパラガス 1kg 化粧箱', qty: 5, price: 5800 },
        ],
        total: 53240,
      },
    ],
  },
];

// ログイン中の顧客 (デモ表示用) — Silver の田中花子
export const sampleCustomer: Customer = customers[1];

// 次のランクまでの残額を返すヘルパー
export function nextRankInfo(customer: Customer): { next: Rank | null; remaining: number } {
  const current = ranks.find((r) => r.id === customer.rank);
  if (!current) return { next: null, remaining: 0 };
  const higher = ranks
    .filter((r) => r.threshold > current.threshold)
    .sort((a, b) => a.threshold - b.threshold);
  if (higher.length === 0) return { next: null, remaining: 0 };
  const next = higher[0];
  return { next, remaining: Math.max(0, next.threshold - customer.totalSpent) };
}
