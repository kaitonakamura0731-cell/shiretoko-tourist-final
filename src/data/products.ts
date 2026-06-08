// 商品データ — 北の逸品堂 商談用モック (TOP / 商品詳細 / カート で共用)
// 本番では RATIO 管理画面 or ヘッドレスCMS から取得する想定。

export type Product = {
  slug: string;
  category: 'specialty' | 'apparel';
  title: string;
  origin: string;
  price: number;
  priceUnit: string;
  stock: number;
  stockLabel: string;
  badge: 'NOW' | 'PRE';
  delivery: string;
  harvestDate?: string;
  summary: string;
  description: string;
  spec: [string, string][];
  imageKey: string;
  related: string[];
  relatedTour?: { slug: string; title: string; price: string };
};

export const products: Product[] = [
  {
    slug: 'asparagus-1kg',
    category: 'specialty',
    title: '朝採りアスパラガス 1kg 化粧箱',
    origin: 'オホーツク・小清水町産',
    price: 5800,
    priceUnit: '税・送料込',
    stock: 14,
    stockLabel: '残り14箱',
    badge: 'NOW',
    delivery: '冷蔵便 / 中1日',
    harvestDate: '2026-06-08 朝5時収穫分',
    summary:
      '本日朝5時に小清水町の畑で収穫したアスパラガスを、冷蔵便で即日出荷します。茹でた瞬間の甘さは、北海道の取り寄せでも別格。',
    description:
      'オホーツクの遅い春、霜が降りた畑から立ち上がる朝採りアスパラガス。昼夜の温度差で甘味が凝縮し、生でも食べられる柔らかさ。1kg 化粧箱で贈答にも対応します。収穫日に出荷、中1日でお手元へ。',
    spec: [
      ['内容量', '1kg（2L以上選別）'],
      ['産地', '北海道斜里郡小清水町'],
      ['生産者', '佐藤農園（取扱20年）'],
      ['等級', '2L〜3L 厳選'],
      ['保存方法', '冷蔵5度・5日以内推奨'],
      ['配送', 'クール冷蔵便 / 中1日'],
      ['熨斗対応', '可（カート画面で選択）'],
    ],
    imageKey: 'asparagus',
    related: ['potato-onion-set', 'potato-danshaku-30kg', 'patagonia-r1-air-hoodie'],
    relatedTour: { slug: 'shiretoko-5lakes', title: '知床五湖ガイドハイキング', price: '¥6,800' },
  },
  {
    slug: 'potato-onion-set',
    category: 'specialty',
    title: 'じゃがいも・玉ねぎ直送便 10kg',
    origin: '北海道小清水町産',
    price: 3980,
    priceUnit: '税・送料込',
    stock: 24,
    stockLabel: '予約受付中',
    badge: 'NOW',
    delivery: '常温便 / 中1-2日',
    summary:
      '清里・小清水の畑から、料理に使いやすいじゃがいもと玉ねぎをまとめて直送。ギフトにも日常使いにも選びやすい定番セットです。',
    description:
      '北海道小清水町産のじゃがいも・玉ねぎを、北の逸品堂から常温便でお届けします。カレー、肉じゃが、ポトフ、グラタンなど毎日の料理に使いやすく、保存もしやすい組み合わせ。到着後は風通しのよい冷暗所で保管してください。',
    spec: [
      ['内容量', '合計10kg（じゃがいも・玉ねぎ詰め合わせ）'],
      ['産地', '北海道斜里郡小清水町'],
      ['保存方法', '常温冷暗所（湿気を避けて）'],
      ['配送', '常温便 / 中1-2日'],
      ['熨斗対応', '可（カート画面で選択）'],
    ],
    imageKey: 'potato-onion',
    related: ['potato-danshaku-30kg', 'asparagus-1kg', 'patagonia-r1-air-hoodie'],
    relatedTour: { slug: 'kaminoko-snowshoe', title: '神の子池スノーシューツアー', price: '¥7,500' },
  },
  {
    slug: 'potato-8kg',
    category: 'specialty',
    title: 'じゃがいも 食べ比べ8kg',
    origin: '北海道オホーツク産',
    price: 4200,
    priceUnit: '税・送料込',
    stock: 30,
    stockLabel: '在庫あり',
    badge: 'NOW',
    delivery: '常温便 / 中1-2日',
    summary:
      '北海道オホーツク産のじゃがいもを、家庭で使いやすい8kgで。煮込み、コロッケ、ポテトサラダまで幅広く使える直送便です。',
    description:
      '北の逸品堂のじゃがいも食べ比べ便は、毎日の料理で使いやすいサイズ感と保存性を重視した家庭向けセットです。到着後は湿気を避け、風通しのよい冷暗所で保管してください。',
    spec: [
      ['内容量', '合計8kg'],
      ['産地', '北海道オホーツク'],
      ['保存方法', '常温冷暗所（湿気を避けて）'],
      ['配送', '常温便 / 中1-2日'],
      ['熨斗対応', '可（カート画面で選択）'],
    ],
    imageKey: 'potato-danshaku',
    related: ['potato-onion-set', 'potato-danshaku-30kg', 'asparagus-1kg'],
    relatedTour: { slug: 'kaminoko-snowshoe', title: '神の子池スノーシューツアー', price: '¥7,500' },
  },
  {
    slug: 'potato-danshaku-30kg',
    category: 'specialty',
    title: '北海道オホーツク産 男爵じゃがいも 30kg',
    origin: '北海道オホーツク・小清水町産',
    price: 5000,
    priceUnit: '税・送料込',
    stock: 18,
    stockLabel: '在庫あり',
    badge: 'NOW',
    delivery: 'ゆうパック常温便 / 中1-2日',
    summary:
      '公式EC掲載の男爵30kg。ホクホクした食感で、ベークドポテト、コロッケ、ポテトサラダに向く大容量の定番品です。',
    description:
      '北の大地オホーツク小清水町産の男爵です。加熱するとホクホクした食感と、じゃがいもらしい香りが楽しめます。粉質が強いため、ベークドポテト、フライドポテト、茹でて潰すポテトサラダやコロッケにおすすめです。北海道と本州の温度差により結露する場合がありますが、商品品質には問題ありません。',
    spec: [
      ['内容量', '男爵30kg'],
      ['産地', '北海道オホーツク・小清水町'],
      ['サイズ', 'L・Mサイズ中心（無選別）'],
      ['保存方法', '常温冷暗所（湿気を避けて）'],
      ['配送', 'ゆうパック / 送料込'],
      ['熨斗対応', '可（カート画面で選択）'],
    ],
    imageKey: 'potato-danshaku',
    related: ['potato-onion-set', 'asparagus-1kg', 'patagonia-r1-air-hoodie'],
    relatedTour: { slug: 'kaminoko-snowshoe', title: '神の子池スノーシューツアー', price: '¥7,500' },
  },
  {
    slug: 'patagonia-r1-air-hoodie',
    category: 'apparel',
    title: "M's R1 Air Full-Zip Hoodie（店主厳選）",
    origin: 'Patagonia',
    price: 22200,
    priceUnit: '税込',
    stock: 12,
    stockLabel: 'S/M/L 在庫あり',
    badge: 'NOW',
    delivery: '宅配便 / 中1-2日',
    summary:
      '知床五湖ガイドの店主が、現場で日常着としている R1 Air。軽量・速乾・蒸れない、薄手フリースの決定版。',
    description:
      'Patagonia の R1 Air フルジップフーディは、薄手なのに保温性が高く、登山・キャンプ・タウンユースまで通年で活躍する万能フリース。店主が知床五湖ガイドで毎日着ているベース。サイズ相談は LINE 公式アカウントで対応。',
    spec: [
      ['ブランド', 'Patagonia'],
      ['品番', "M's R1 Air Full-Zip Hoodie / Clement Blue (CLMB)"],
      ['素材', 'リサイクル ポリエステル 100%'],
      ['サイズ', 'S / M / L 在庫あり'],
      ['配送', '宅配便 / 中1-2日'],
      ['返品交換', 'サイズ違い 7日間無料交換可'],
    ],
    imageKey: 'patagonia-hoodie',
    related: ['asparagus-1kg', 'potato-onion-set', 'patagonia-r1-zip-neck'],
    relatedTour: { slug: 'shiretoko-5lakes', title: '知床五湖ガイドハイキング', price: '¥6,800' },
  },
  {
    slug: 'patagonia-r1-zip-neck',
    category: 'apparel',
    title: "M's R1 Air Zip-Neck（Clement Blue）",
    origin: 'Patagonia',
    price: 19800,
    priceUnit: '税込',
    stock: 8,
    stockLabel: 'S 在庫あり',
    badge: 'NOW',
    delivery: '宅配便 / 中1-2日',
    summary:
      'R1 Air の軽量・速乾性をそのままに、重ね着しやすいジップネック型。旅先でも日常でも温度調整しやすい一着です。',
    description:
      'Patagonia の R1 Air ジップネックは、軽くて蒸れにくい薄手フリース。行動中は熱を逃がし、休憩時はしっかり保温します。知床の朝夕や、春秋の旅行、普段使いのミドルレイヤーとしておすすめです。',
    spec: [
      ['ブランド', 'Patagonia'],
      ['品番', "M's R1 Air Zip-Neck / Clement Blue (CLMB)"],
      ['素材', 'リサイクル ポリエステル 100%'],
      ['サイズ', 'S 在庫あり'],
      ['配送', '宅配便 / 中1-2日'],
      ['返品交換', 'サイズ違い 7日間無料交換可'],
    ],
    imageKey: 'patagonia-r1-zip-neck',
    related: ['patagonia-r1-air-hoodie', 'asparagus-1kg', 'potato-onion-set'],
    relatedTour: { slug: 'shiretoko-5lakes', title: '知床五湖ガイドハイキング', price: '¥6,800' },
  },
];

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatYen(n: number): string {
  return '¥' + n.toLocaleString('ja-JP');
}
