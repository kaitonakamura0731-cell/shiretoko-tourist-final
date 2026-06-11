// ふるさと納税案内データ — 北の逸品堂
// 清里町 (本社所在地) / 斜里町 (隣接・世界自然遺産 知床) への寄付返礼案内
// 北の逸品堂の商品を、両町のふるさと納税返礼品として紹介する
// 税制詳細は税理士・各自治体へ確認する旨を明記

export type Munic = {
  code: string;
  name: string;
  tagline: string;
  population: number;
  lat: number;
  lng: number;
  specialties: string[];
};

export type Item = {
  munic: string; // Munic.code を参照
  title: string;
  donation: number;
  description: string;
  image?: string;
};

// 自治体 (2町)
export const municipalities: Munic[] = [
  {
    code: '01544',
    name: '清里町',
    tagline: 'クリーンな清里町 — 斜里岳の伏流水と畑の町',
    population: 4000,
    lat: 43.8294,
    lng: 144.6536,
    specialties: [
      'じゃがいも (男爵・キタアカリ・インカのめざめ)',
      '玉ねぎ',
      'アスパラガス',
      '酪農 (牛乳・チーズ)',
      '斜里岳の自然観光',
      '清里焼酎 (じゃがいも焼酎)',
    ],
  },
  {
    code: '01545',
    name: '斜里町',
    tagline: '世界自然遺産・知床の町 — オホーツクの海と原始の森',
    population: 11000,
    lat: 43.9106,
    lng: 144.6603,
    specialties: [
      '秋鮭 (時鮭・銀鮭)',
      'ホタテ (オホーツク産)',
      'いくら醤油漬け',
      '知床産はちみつ',
      '世界自然遺産 知床の自然観光',
      '羅臼昆布 (近隣)',
    ],
  },
];

// 返礼品案内 (北の逸品堂が紹介する形で構成)
// 寄付額は一般的な相場帯 (還元率3割前後) を参考に設定
export const items: Item[] = [
  // 清里町 返礼品 (4品)
  {
    munic: '01544',
    title: '朝採りアスパラガス 1kg 化粧箱',
    donation: 15000,
    description:
      '斜里岳の伏流水で育った清里町産アスパラ。朝5時に収穫し、その日のうちに化粧箱で発送。甘みと穂先のしっかり感が違います。5月下旬〜6月の季節限定。',
    image: 'furusato-kiyosato-asparagus',
  },
  {
    munic: '01544',
    title: '清里町産じゃがいも食べ比べ 10kg',
    donation: 10000,
    description:
      '男爵・キタアカリ・インカのめざめの3品種食べ比べセット。火山灰土壌で育った清里町のじゃがいもは、ホクホク感と甘みが段違い。秋〜冬の貯蔵品。',
    image: 'furusato-kiyosato-potato',
  },
  {
    munic: '01544',
    title: '清里町産 玉ねぎ便 5kg',
    donation: 8000,
    description:
      '糖度が高くサラダでも甘い清里玉ねぎ。寒暖差の大きい気候が、辛味を抑え甘みを引き出します。スープ・カレー・生食、なんにでも合う万能選手。',
    image: 'furusato-kiyosato-onion',
  },
  {
    munic: '01544',
    title: '清里町酪農家のチーズ詰め合わせ',
    donation: 12000,
    description:
      '清里町の小規模酪農家が手作りするフレッシュチーズ・セミハード3種詰め合わせ。牛の餌から仕込みまで一貫した地産品。冷蔵便。',
    image: 'furusato-kiyosato-cheese',
  },

  // 斜里町 返礼品 (4品)
  {
    munic: '01545',
    title: '知床産 鮭フレーク 3本セット',
    donation: 12000,
    description:
      '斜里漁港に水揚げされた秋鮭を、塩・米油のみで仕上げた無添加鮭フレーク。瓶詰3本セット。ご飯のお供・おにぎり・パスタに。常温保存。',
    image: 'furusato-shari-salmon-flake',
  },
  {
    munic: '01545',
    title: 'オホーツク産 ホタテ貝柱 詰め合わせ 1kg',
    donation: 18000,
    description:
      '斜里沖オホーツク海の冷たい潮で育ったホタテ貝柱。船上凍結で鮮度と甘みを閉じ込めました。お刺身・バター焼き・炊き込みごはんに。冷凍便。',
    image: 'furusato-shari-scallop',
  },
  {
    munic: '01545',
    title: '知床 いくら醤油漬け 250g × 2',
    donation: 20000,
    description:
      '斜里産秋鮭の卵を、北海道産醤油と昆布出汁で仕込んだいくら醤油漬け。粒のはじけ感と上品な塩味。年末年始の食卓に。冷凍便・小分け2パック。',
    image: 'furusato-shari-ikura',
  },
  {
    munic: '01545',
    title: '知床産 はちみつ アカシア + 百花 2本',
    donation: 9000,
    description:
      '原始林を残す世界自然遺産・知床で採蜜された希少なはちみつ。アカシア (淡白で上品) と百花 (深い香り) の2本セット。常温保存。',
    image: 'furusato-shari-honey',
  },
];

// 解説文 — ページ表示用の静的コピー
export const intro = {
  // 北の逸品堂がふるさと納税を案内する意味
  whyHere: {
    title: 'ふるさと納税で清里町・斜里町を選ぶということ',
    body: `北の逸品堂は、清里町に本社を構え、隣の斜里町と一緒に34年、知床の畑と海を見てきました。
ふるさと納税は、生まれた町を応援する制度として始まりました。けれど近年は「返礼品で選ぶ」が当たり前になり、生産地と消費者の距離が遠くなる場面も増えています。
このページでは、北の逸品堂が普段お付き合いしている清里町・斜里町の生産者の品を、ふるさと納税という形でご案内します。寄付の先には、畑や港で働く人がいることを、少しでも感じていただければ嬉しいです。`,
  },

  // 店主と地域の繋がり
  relationship: {
    title: '店主と地域の繋がり、34年',
    body: `1992年、知床ウトロで一軒の小さな土産店から始まった北の逸品堂は、清里町に本社を移してからも、斜里町の漁師・清里町の農家と日々顔を合わせています。
「いつもの畑、いつもの船」から仕入れる関係を34年続けてきたからこそ、ふるさと納税の返礼品としてご案内できる品にも、自信があります。
寄付された金額は各町の財源として、子育て支援・自然保護・農業振興などに活用されます。北の逸品堂は仲介事業者として、生産者と寄付者の間をつなぐ役割を担います。`,
  },

  // 寄付控除の一般論
  taxNote: {
    title: '寄付控除の使い方 (一般論)',
    body: `ふるさと納税では、寄付額のうち2,000円を超える部分について、所得税・住民税からの控除が受けられる場合があります。控除上限額は年収・家族構成・他の控除状況によって変わります。
ワンストップ特例制度を使う場合は、確定申告が不要になる条件 (給与所得者で年5自治体以内など) があります。
※ 控除の可否・上限額・申請方法の詳細については、必ず税理士または各自治体・税務署にご確認ください。本ページは制度の一般的なご案内であり、個別の税務判断を保証するものではありません。`,
  },
} as const;

// ヘルパー
export function findMunic(code: string): Munic | undefined {
  return municipalities.find((m) => m.code === code);
}

export function itemsByMunic(code: string): Item[] {
  return items.filter((i) => i.munic === code);
}
