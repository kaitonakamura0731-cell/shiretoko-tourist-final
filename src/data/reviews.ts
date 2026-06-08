// 商品レビュー (Yahoo!ショッピング店 ★5.00 6件の世界観を継承)
// 編集可: 新規レビューは reviews 配列末尾に追加すること

export type Review = {
  id: string;
  productSlug: string;
  reviewerName: string;
  reviewerInitial: string;
  rating: number; // 1-5
  postedAt: string; // YYYY-MM-DD
  title: string;
  body: string;
  verified: boolean;
  useful: number;
  reply?: { from: string; date: string; body: string };
};

export const reviews: Review[] = [
  // ──────────── アスパラ 1kg (4件) ────────────
  {
    id: 'rv-001',
    productSlug: 'asparagus-1kg',
    reviewerName: '田村',
    reviewerInitial: 'T',
    rating: 5,
    postedAt: '2026-05-28',
    title: '家族で取り合いになった',
    body: '届いた日に蒸して食べたら、子どもが「これ甘い」とおかわり。スーパーの倍値でも納得の太さと香り。来年も予約します。',
    verified: true,
    useful: 12,
    reply: {
      from: '北の逸品堂 店主',
      date: '2026-05-30',
      body: 'ありがとうございます。斜里の朝採り、これからも続けます。',
    },
  },
  {
    id: 'rv-002',
    productSlug: 'asparagus-1kg',
    reviewerName: '佐々木',
    reviewerInitial: 'S',
    rating: 5,
    postedAt: '2026-05-22',
    title: '生で齧れる新鮮さ',
    body: '関西在住です。クール便で翌朝に着き、根元まで筋がない。生で齧ったら水分の甘さに驚きました。リピート確定。',
    verified: true,
    useful: 8,
  },
  {
    id: 'rv-003',
    productSlug: 'asparagus-1kg',
    reviewerName: '清水',
    reviewerInitial: 'S',
    rating: 5,
    postedAt: '2026-05-19',
    title: '焼くだけで一品',
    body: 'オリーブオイルと塩だけで焼いたら、付け合わせのつもりが主役になりました。穂先までしっかりしている。',
    verified: true,
    useful: 5,
    reply: {
      from: '北の逸品堂 店主',
      date: '2026-05-21',
      body: '焼きはシンプルが一番ですね。嬉しいレビューです。',
    },
  },
  {
    id: 'rv-004',
    productSlug: 'asparagus-1kg',
    reviewerName: '原田',
    reviewerInitial: 'H',
    rating: 4,
    postedAt: '2026-05-15',
    title: '味は満点、量で迷う',
    body: '味は文句なしです。1kgは二人暮らしには少し多く、半分は天ぷらにしました。次は友人と分けて頼みます。',
    verified: true,
    useful: 3,
  },

  // ──────────── じゃがいも・玉ねぎセット (2件) ────────────
  {
    id: 'rv-005',
    productSlug: 'potato-onion-set',
    reviewerName: '中島',
    reviewerInitial: 'N',
    rating: 5,
    postedAt: '2026-04-10',
    title: 'ポトフが別物になった',
    body: '男爵の煮崩れ感と玉ねぎの甘さ。いつものポトフが別物に。北海道の根菜って本当に違いますね。',
    verified: true,
    useful: 9,
    reply: {
      from: '北の逸品堂 店主',
      date: '2026-04-12',
      body: '清里町の土が良いんです。お楽しみいただけて嬉しいです。',
    },
  },
  {
    id: 'rv-006',
    productSlug: 'potato-onion-set',
    reviewerName: '吉田',
    reviewerInitial: 'Y',
    rating: 5,
    postedAt: '2026-03-25',
    title: '箱を開けた瞬間の土の香り',
    body: '泥付きで届きました。スーパーでは味わえない土の香り。じゃがバターにしたら、家族から「もう市販品に戻れない」と。',
    verified: false,
    useful: 6,
  },

  // ──────────── Patagonia R1 Air Hoodie (4件) ────────────
  {
    id: 'rv-007',
    productSlug: 'patagonia-r1-air-hoodie',
    reviewerName: '小林',
    reviewerInitial: 'K',
    rating: 5,
    postedAt: '2026-05-18',
    title: '現場で使い込まれた感が伝わる',
    body: '知床のガイドが実際に着ているという話に納得。軽くて蒸れない。羅臼岳の春先に着ましたが、汗冷えしませんでした。',
    verified: true,
    useful: 11,
    reply: {
      from: '北の逸品堂 店主',
      date: '2026-05-20',
      body: 'ガイドの相棒です。長く使ってあげてください。',
    },
  },
  {
    id: 'rv-008',
    productSlug: 'patagonia-r1-air-hoodie',
    reviewerName: '前田',
    reviewerInitial: 'M',
    rating: 5,
    postedAt: '2026-04-30',
    title: '梱包がていねい',
    body: '新品Sサイズ、タグ付きで状態完璧。Patagonia公式並みの梱包に好感持てました。次は妻のサイズも頼みたい。',
    verified: true,
    useful: 4,
  },
  {
    id: 'rv-009',
    productSlug: 'patagonia-r1-air-hoodie',
    reviewerName: '伊藤',
    reviewerInitial: 'I',
    rating: 5,
    postedAt: '2026-04-12',
    title: 'ミッドレイヤーの定番',
    body: 'グリッドフリースの定番R1のエア版。秋の縦走で使いましたが、行動中も停滞中も快適。色味も写真通り。',
    verified: true,
    useful: 7,
    reply: {
      from: '北の逸品堂 店主',
      date: '2026-04-14',
      body: '縦走でのレビュー、参考になります。ありがとうございます。',
    },
  },
  {
    id: 'rv-010',
    productSlug: 'patagonia-r1-air-hoodie',
    reviewerName: '渡辺',
    reviewerInitial: 'W',
    rating: 4,
    postedAt: '2026-03-08',
    title: 'サイズ感はタイトめ',
    body: '海外モデルなのかSでもタイト。普段Mの自分はぴったり。中に着込むならワンサイズ上推奨です。品質は文句なし。',
    verified: true,
    useful: 10,
  },

  // ──────────── Patagonia R1 Zip Neck (3件) ────────────
  {
    id: 'rv-011',
    productSlug: 'patagonia-r1-zip-neck',
    reviewerName: '長谷川',
    reviewerInitial: 'H',
    rating: 5,
    postedAt: '2026-05-05',
    title: '冬の街でも山でも',
    body: '東京の冬の自転車通勤と、週末の高尾で兼用。グリッド構造で蒸れず、街でも違和感ない色。',
    verified: true,
    useful: 6,
  },
  {
    id: 'rv-012',
    productSlug: 'patagonia-r1-zip-neck',
    reviewerName: '森',
    reviewerInitial: 'M',
    rating: 5,
    postedAt: '2026-04-22',
    title: '新品で正規より安く買えた',
    body: '新品タグ付きでこの値段は嬉しい。在庫が出たら買い足したいモデルです。発送も早かった。',
    verified: false,
    useful: 2,
    reply: {
      from: '北の逸品堂 店主',
      date: '2026-04-23',
      body: '入荷ありましたらまたご案内します。',
    },
  },
  {
    id: 'rv-013',
    productSlug: 'patagonia-r1-zip-neck',
    reviewerName: '岡田',
    reviewerInitial: 'O',
    rating: 4,
    postedAt: '2026-03-14',
    title: '袖口の作りが好き',
    body: 'サムホールがある袖口、寒い朝にありがたい。星4は色味が写真より少し暗めだったため。実物の方が好みでした。',
    verified: true,
    useful: 5,
  },

  // ──────────── その他 (2件) ────────────
  {
    id: 'rv-014',
    productSlug: 'potato-8kg',
    reviewerName: '山口',
    reviewerInitial: 'Y',
    rating: 5,
    postedAt: '2026-04-02',
    title: '実家にも送りました',
    body: '8kgはさすがの量。実家にお裾分けしたら「これどこの?」と聞かれました。男爵の粉感が懐かしい味。',
    verified: true,
    useful: 8,
    reply: {
      from: '北の逸品堂 店主',
      date: '2026-04-04',
      body: 'お裾分けされる方が一番嬉しいかもしれません。ありがとうございます。',
    },
  },
  {
    id: 'rv-015',
    productSlug: 'potato-danshaku-30kg',
    reviewerName: '大島',
    reviewerInitial: 'O',
    rating: 5,
    postedAt: '2026-03-18',
    title: '飲食店で使っています',
    body: '都内で小さなビストロをやっています。30kgで仕入れて、冬中ポタージュとフリットに。男爵の風味、お客様から評判です。',
    verified: false,
    useful: 4,
  },
];

export function reviewsByProduct(slug: string): Review[] {
  return reviews.filter((r) => r.productSlug === slug);
}

export function averageRating(slug: string): number {
  const list = reviewsByProduct(slug);
  if (list.length === 0) return 0;
  return list.reduce((sum, r) => sum + r.rating, 0) / list.length;
}
