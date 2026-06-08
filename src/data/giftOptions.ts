// ギフトオプション定義 — 北の逸品堂
// のし / ラッピング / メッセージカード / 配送日指定
// カート画面 (B-4) で選択UIに使用

export type NoshiOption = {
  slug: string;
  category: 'keiji' | 'chouji' | 'noshigami';
  label: string;
  description: string;
  defaultName?: string; // 表書きデフォルト
};

export type WrappingOption = {
  slug: string;
  label: string;
  description: string;
  priceAdd: number;
  imageKey?: string;
};

export type MessageCardOption = {
  slug: string;
  label: string;
  body: string; // 定型文
  scene: '一般' | '父の日' | '母の日' | 'お中元・お歳暮' | '誕生日';
};

export type DeliveryDateOption = {
  slug: string;
  label: string;
  date: string; // ISO or 季節指定
  note: string;
};

// のし対応 (慶事 / 弔事 / 熨斗紙)
export const noshiOptions: NoshiOption[] = [
  {
    slug: 'keiji-kouhaku-chou',
    category: 'keiji',
    label: '慶事 紅白蝶結び',
    description: '出産祝い・お中元・お歳暮・内祝いなど何度繰り返してもよいお祝い事に',
    defaultName: '御祝',
  },
  {
    slug: 'keiji-kouhaku-musubikiri',
    category: 'keiji',
    label: '慶事 紅白結び切り',
    description: '結婚祝い・快気祝いなど一度きりがよいお祝い事に',
    defaultName: '寿',
  },
  {
    slug: 'keiji-ochugen',
    category: 'keiji',
    label: '慶事 お中元・お歳暮',
    description: '夏季・冬季の定番贈答に。表書きは「御中元」「御歳暮」',
    defaultName: '御中元',
  },
  {
    slug: 'chouji-kuroshiro',
    category: 'chouji',
    label: '弔事 黒白結び切り',
    description: 'お悔やみ・法要のお返しに。表書きは「御供」「志」',
    defaultName: '御供',
  },
  {
    slug: 'noshigami-blank',
    category: 'noshigami',
    label: '熨斗紙 無地',
    description: '表書き・名入れなしの熨斗紙のみ。簡易のし対応',
  },
  {
    slug: 'noshigami-namaire',
    category: 'noshigami',
    label: '熨斗紙 名入れあり',
    description: '指定された名入れで対応。法人名・連名にも対応',
  },
];

// ラッピング (3パターン)
export const wrappingOptions: WrappingOption[] = [
  {
    slug: 'wrap-kraft',
    label: 'クラフト包装',
    description: '北の逸品堂ロゴ入りクラフト紙。素朴で力強い、知床らしい包み',
    priceAdd: 0,
    imageKey: 'wrap-kraft',
  },
  {
    slug: 'wrap-washi',
    label: '北海道和紙 + 麻紐',
    description: '北海道産和紙を麻紐で結ぶ和モダン仕様。改まった贈答に',
    priceAdd: 500,
    imageKey: 'wrap-washi',
  },
  {
    slug: 'wrap-premium-box',
    label: 'プレミアム化粧箱',
    description: '木目調の化粧箱に入れて、栞型カード付きでお届け',
    priceAdd: 1200,
    imageKey: 'wrap-premium',
  },
];

// メッセージカード (5パターン)
export const messageCardOptions: MessageCardOption[] = [
  {
    slug: 'card-thanks-general',
    label: '感謝 (一般)',
    body: 'いつもありがとうございます。北海道の旬を、ささやかにお届けします。',
    scene: '一般',
  },
  {
    slug: 'card-father',
    label: '父の日',
    body: 'お父さん、いつもありがとう。北の朝採りを一緒に味わってください。',
    scene: '父の日',
  },
  {
    slug: 'card-mother',
    label: '母の日',
    body: 'お母さん、いつもありがとう。北の畑の朝の香りをお届けします。',
    scene: '母の日',
  },
  {
    slug: 'card-ochugen',
    label: 'お中元・お歳暮',
    body: '日頃のご厚情に感謝いたします。北海道よりささやかな品をお届けします。',
    scene: 'お中元・お歳暮',
  },
  {
    slug: 'card-birthday',
    label: '誕生日',
    body: 'お誕生日おめでとうございます。今年も北の恵みと共に良い一年を。',
    scene: '誕生日',
  },
];

// 配送日指定 (季節イベント対応)
export const deliveryDateOptions: DeliveryDateOption[] = [
  {
    slug: 'delivery-anyday',
    label: '指定なし (最短発送)',
    date: 'asap',
    note: '収穫・在庫状況に応じて中1〜2日で発送',
  },
  {
    slug: 'delivery-tanabata',
    label: '七夕便 (7月7日着)',
    date: '2026-07-07',
    note: '7月7日着でお届け。注文は3日前まで',
  },
  {
    slug: 'delivery-ochugen',
    label: 'お中元便 (7月15日着)',
    date: '2026-07-15',
    note: '関東以西お中元期間に合わせて指定可',
  },
  {
    slug: 'delivery-keirou',
    label: '敬老の日 (9月15日着)',
    date: '2026-09-15',
    note: '敬老の日当日着。1週間前までに注文ください',
  },
  {
    slug: 'delivery-custom',
    label: '日付指定 (カートで入力)',
    date: 'custom',
    note: 'カート画面でご希望日を入力。最短発送日以降で指定可',
  },
];

export function findNoshi(slug: string): NoshiOption | undefined {
  return noshiOptions.find((n) => n.slug === slug);
}

export function findWrapping(slug: string): WrappingOption | undefined {
  return wrappingOptions.find((w) => w.slug === slug);
}

export function findMessageCard(slug: string): MessageCardOption | undefined {
  return messageCardOptions.find((m) => m.slug === slug);
}

export function findDeliveryDate(slug: string): DeliveryDateOption | undefined {
  return deliveryDateOptions.find((d) => d.slug === slug);
}
