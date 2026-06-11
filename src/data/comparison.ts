// 公式ECとYahoo!ショッピング店の購入方法ガイド — 北の逸品堂
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
    axis: '表示価格',
    yahoo: 'ほぼ同額（同一商品で並列）',
    own: 'ほぼ同額（同一商品で並列）',
    advantage: 'tie',
    note: 'ポイント・送料・配送条件は、購入前の画面で確認できます。',
  },
  {
    axis: 'ポイント還元',
    yahoo: '1〜5%程度（キャンペーン依存・条件付き）',
    own: '会員登録で1%（購入条件によりキャンペーン特典あり）',
    advantage: 'own',
    note: '公式ECは基本ポイントが付きます。Yahoo は付与条件と上限をご確認ください。',
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
    axis: '決済方法',
    yahoo: 'モール標準の決済方法に対応',
    own: 'クレジットカード・コード決済・銀行振込・代引きに対応',
    advantage: 'tie',
    note: 'お客様には購入場所に関わらず、慣れた決済方法を選べる状態にする。',
  },
  {
    axis: '相談・履歴サポート',
    yahoo: 'モール内の案内が中心',
    own: '会員ページとLINEで、再注文・贈答相談をしやすい',
    advantage: 'own',
  },
  {
    axis: 'LINE 連携',
    yahoo: 'なし',
    own: '1:1 相談・再入荷通知・贈答リマインド',
    advantage: 'own',
  },
  {
    axis: '見つけやすさ',
    yahoo: 'Yahoo!ショッピング内の検索から見つけやすい',
    own: '北の逸品堂を知っている方が指名買いしやすい',
    advantage: 'yahoo',
    note: '初回はYahoo、次回以降は公式ECという使い分けもできます。',
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
      '公式ECでは会員ポイント、送料条件、中1日出荷の案内をまとめて確認できます。朝採り当日枠の相談もしやすい商品です。',
  },
  {
    slug: 'potato-danshaku-30kg',
    title: '男爵いも 30kg 産地直送',
    yahooUrl: 'https://store.shopping.yahoo.co.jp/shiretoko-tourist/potato-danshaku-30kg.html',
    yahooPrice: 5000,
    ownPrice: 5000,
    ownAdvantage:
      '公式ECでは送料条件と同梱の可否をまとめて確認できます。会員ランク特典も次回以降に使いやすい商品です。',
  },
  {
    slug: 'patagonia-r1-air-hoodie',
    title: 'Patagonia R1 Air フーディ',
    yahooUrl: 'https://store.shopping.yahoo.co.jp/shiretoko-tourist/patagonia-r1-air-hoodie.html',
    yahooPrice: 22200,
    ownPrice: 22200,
    ownAdvantage:
      'サイズ相談・再入荷通知を LINE で受け取りやすい商品です。現場での着用感も公式EC側で確認しやすくしています。',
  },
];
