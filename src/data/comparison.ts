// 自社EC vs Yahoo!ショッピング店 比較データ — 北の逸品堂
// 商談・LP 用の比較指標。価格・ポイント・送料・配送・決済・顧客データ・LINE連携。
// 本番では値や URL を最新の店舗ページに合わせて更新する。

export type CompareRow = {
  axis: string;
  yahoo: string;
  own: string;
  advantage: 'yahoo' | 'own' | 'tie';
  note?: string;
};

export const rows: CompareRow[] = [
  {
    axis: '販売価格',
    yahoo: 'ほぼ同額（同一商品で並列）',
    own: 'ほぼ同額（自社で実質値引き余地あり）',
    advantage: 'tie',
    note: '表示価格は揃え、ポイント・送料・決済負担で実質差が出る設計。',
  },
  {
    axis: 'ポイント還元',
    yahoo: '1〜5%程度（キャンペーン依存・条件付き）',
    own: '会員ランクで 5〜10%（常時・条件なし）',
    advantage: 'own',
    note: '自社は常時還元で実質価格を底上げ。Yahoo は付与条件と上限が複雑。',
  },
  {
    axis: '送料',
    yahoo: '店舗ごとに別送料（同梱不可・複数店で都度発生）',
    own: '¥5,000 以上で送料無料（同梱可）',
    advantage: 'own',
  },
  {
    axis: '配送スピード',
    yahoo: '出荷まで 2〜3 営業日',
    own: '中1日で出荷（朝採り・即日出荷品あり）',
    advantage: 'own',
    note: '生鮮（アスパラ・じゃがいも）は鮮度差が直接出る軸。',
  },
  {
    axis: '決済まわりの店舗負担',
    yahoo: '実質負担が重い（出店料・販売手数料・決済手数料・販促負担の合算）',
    own: 'カード手数料 2.5%（1点あたりに換算した実質負担も自社が軽い）',
    advantage: 'own',
    note: '店舗側の負担差は還元・送料無料・配送速度の原資になる。',
  },
  {
    axis: '顧客データ',
    yahoo: '購入者情報は取得不可（メール・住所はモール内に閉じる）',
    own: '会員制で取得可（リピート・贈答履歴・好み）',
    advantage: 'own',
  },
  {
    axis: 'LINE 連携',
    yahoo: 'なし',
    own: '1:1 相談・再入荷通知・贈答リマインド',
    advantage: 'own',
  },
  {
    axis: '集客力 / 認知',
    yahoo: 'モール内回遊で初回接触は強い',
    own: '初回接触は弱め（自社で別途集客が必要）',
    advantage: 'yahoo',
    note: '自社は「2回目以降の指名買い」を取りに行く設計。',
  },
];

export type CompareProduct = {
  slug: string;
  title: string;
  yahooUrl: string;
  yahooPrice: number;
  ownPrice: number;
  ownAdvantage: string;
};

export const productSamples: CompareProduct[] = [
  {
    slug: 'asparagus-1kg',
    title: '朝採りアスパラガス 1kg 化粧箱',
    yahooUrl: 'https://store.shopping.yahoo.co.jp/shiretoko-tourist/asparagus-1kg.html',
    yahooPrice: 5800,
    ownPrice: 5800,
    ownAdvantage:
      '同価格でも、ポイント常時5〜10% + 送料込 + 中1日出荷で実質1〜2割お得。朝採り当日出荷は自社のみ。',
  },
  {
    slug: 'potato-danshaku-30kg',
    title: '男爵いも 30kg 産地直送',
    yahooUrl: 'https://store.shopping.yahoo.co.jp/shiretoko-tourist/potato-danshaku-30kg.html',
    yahooPrice: 5000,
    ownPrice: 5000,
    ownAdvantage:
      '送料込・同梱可。Yahoo は他店併用で送料が二重に乗りやすい。会員ランクで次回以降の還元が積み上がる。',
  },
  {
    slug: 'patagonia-r1-air-hoodie',
    title: 'Patagonia R1 Air フーディ',
    yahooUrl: 'https://store.shopping.yahoo.co.jp/shiretoko-tourist/patagonia-r1-air-hoodie.html',
    yahooPrice: 22200,
    ownPrice: 22200,
    ownAdvantage:
      'サイズ相談・再入荷通知を LINE で 1:1 対応。アパレルは試着前提の相談需要が大きく、自社の体験が効く。',
  },
];
