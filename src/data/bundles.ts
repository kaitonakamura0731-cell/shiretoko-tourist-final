// バンドル(セット販売)データ — 北の逸品堂
// 通常単品より割安、ギフト対応、店主の一言メモ込み
// 本番では RATIO 管理画面 / ヘッドレスCMS から取得想定

export type Bundle = {
  slug: string;
  title: string;
  items: string[]; // products.ts の slug 配列
  originalPrice: number;
  bundlePrice: number;
  discount: number;
  imageKey: string;
  description: string; // 80字目安
  storyMemo: string; // 店主の一言 50字目安
  gift: boolean;
  seasonNote: string;
};

export const bundles: Bundle[] = [
  {
    slug: 'asparagus-set',
    title: '春の北海道便 アスパラ + じゃが + 玉ねぎセット',
    items: ['asparagus-1kg', 'potato-onion-set'],
    originalPrice: 10180,
    bundlePrice: 9000,
    discount: 1180,
    imageKey: 'asparagus',
    description:
      'オホーツク朝採りアスパラ1kgに、小清水産じゃがいも・玉ねぎ10kgを合わせた春限定セット。届いたその日に北海道の食卓を再現できます。',
    storyMemo: '畑から直送した朝採りアスパラを、まず塩茹でで食べてみてください。',
    gift: true,
    seasonNote: '5月中旬〜6月末 / アスパラ収穫期限定',
  },
  {
    slug: 'r1-layer',
    title: 'R1 Air レイヤリングセット (Hoodie + Zip-Neck)',
    items: ['patagonia-r1-air-hoodie', 'patagonia-r1-zip-neck'],
    originalPrice: 42000,
    bundlePrice: 39800,
    discount: 2200,
    imageKey: 'patagonia-hoodie',
    description:
      '知床ガイド店主が現場で着用している R1 Air の重ね着セット。朝晩冷える知床の気候に、薄手フリースを二枚重ねる本気の防寒スタイル。',
    storyMemo: '冷えた朝はジップネックを内側に、行動中はフーディだけで体温調整。',
    gift: false,
    seasonNote: '通年 / 春秋の旅・冬の街使い両対応',
  },
  {
    slug: 'master-pick-3',
    title: '店主厳選 Patagonia 3点ボックス',
    items: ['patagonia-r1-air-hoodie', 'patagonia-r1-zip-neck'],
    originalPrice: 66000,
    bundlePrice: 62000,
    discount: 4000,
    imageKey: 'patagonia-hoodie',
    description:
      '知床五湖ガイド歴20年の店主が、その季節に最も役立つ Patagonia 3点を箱詰め。中身は季節入替制で、毎回ガイドのコメント付き。',
    storyMemo: '春は薄手レイヤー中心、秋はインサレーション軸で組みます。',
    gift: true,
    seasonNote: '季節入替 / 春夏便・秋冬便で構成変更',
  },
  {
    slug: 'family-bin',
    title: '家族便 じゃがいも30kg + 玉ねぎ10kg',
    items: ['potato-danshaku-30kg', 'potato-onion-set'],
    originalPrice: 8980,
    bundlePrice: 7800,
    discount: 1180,
    imageKey: 'potato-danshaku',
    description:
      '北海道オホーツク産の男爵30kgと、玉ねぎ込みの10kgセットを大容量送料込で。三世代家族・社員食堂・飲食店仕入にも対応する家族便。',
    storyMemo: '届いたら新聞紙に包んで冷暗所へ。3ヶ月は美味しく持ちます。',
    gift: false,
    seasonNote: '通年 / 秋掘り保存品中心',
  },
  {
    slug: 'gift-premium',
    title: 'プレミアムギフト アスパラ1kg化粧箱 + のし',
    items: ['asparagus-1kg'],
    originalPrice: 5800,
    bundlePrice: 6800,
    discount: 0,
    imageKey: 'asparagus',
    description:
      'オホーツク朝採りアスパラ1kgを化粧箱に詰め、のし・メッセージカード・配送日指定をセット。父の日・お中元・お祝い事の贈答に。',
    storyMemo: '到着日を逆算して収穫します。贈答先のご都合に合わせてください。',
    gift: true,
    seasonNote: '5月中旬〜6月末 / 父の日・お中元対応',
  },
];

export function findBundle(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}
