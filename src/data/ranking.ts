// 週間ランキング (Top 20 / Specialty 6 / Apparel 20)
// catalog.ts のIDと整合
// 順位変動・売上件数・店主補足を含む

export type RankingEntry = {
  rank: number;
  prevRank: number;
  sales: number;
  storeNote?: string;
  catalogId: string;
};

// ========================================
// 総合 Top 20
// 産直6点 (specialty全件) + アパレル14点 (R1/Nano/Retro-X系の人気所)
// ========================================
export const rankingOverall: RankingEntry[] = [
  { rank: 1,  prevRank: 2,  sales: 187, storeNote: "毎週金曜の出荷分は早い者勝ち。今年は天候良好で甘みが乗った",            catalogId: "3009" }, // アスパラ 2.0kg
  { rank: 2,  prevRank: 1,  sales: 174, storeNote: "贈答に選ばれる定番サイズ。化粧箱対応可",                                  catalogId: "3006" }, // アスパラ 1.5kg
  { rank: 3,  prevRank: 4,  sales: 156,                                                                                       catalogId: "3004" }, // アスパラ 1.0kg
  { rank: 4,  prevRank: 3,  sales: 142, storeNote: "プロ用・直売所向け。業務利用が増えています",                              catalogId: "3010" }, // アスパラ 4.0kg
  { rank: 5,  prevRank: 7,  sales: 128,                                                                                       catalogId: "1115" }, // R1エア フルジップ
  { rank: 6,  prevRank: 5,  sales: 121,                                                                                       catalogId: "1109" }, // ナノ・パフ・ベスト
  { rank: 7,  prevRank: 9,  sales: 115,                                                                                       catalogId: "1167" }, // クラシック・レトロX・ベスト
  { rank: 8,  prevRank: 6,  sales: 108, storeNote: "オホーツクの大地の味。煮崩れしにくく万能",                                catalogId: "572"  }, // じゃがいも 男爵 30kg
  { rank: 9,  prevRank: 8,  sales: 102,                                                                                       catalogId: "1093" }, // グラナイト・クレスト レイン
  { rank: 10, prevRank: 12, sales: 96,                                                                                        catalogId: "1196" }, // サーマル・エアシェッド
  { rank: 11, prevRank: 10, sales: 91,                                                                                        catalogId: "1131" }, // グラナイト・クレスト XS
  { rank: 12, prevRank: 14, sales: 87,                                                                                        catalogId: "1350" }, // クラシック・レトロX ジャケット
  { rank: 13, prevRank: 11, sales: 83,                                                                                        catalogId: "1454" }, // ベスト
  { rank: 14, prevRank: 16, sales: 79,                                                                                        catalogId: "1465" }, // プルオーバー
  { rank: 15, prevRank: 13, sales: 75, storeNote: "数量限定。サイズ違いでもお早めに",                                         catalogId: "3012" }, // アスパラ 8.0kg
  { rank: 16, prevRank: 19, sales: 71,                                                                                        catalogId: "1478" }, // ベスト
  { rank: 17, prevRank: 15, sales: 68,                                                                                        catalogId: "1490" }, // プルオーバー
  { rank: 18, prevRank: 20, sales: 64,                                                                                        catalogId: "1395" }, // その他
  { rank: 19, prevRank: 17, sales: 60,                                                                                        catalogId: "1388" }, // ジャケット
  { rank: 20, prevRank: 18, sales: 57,                                                                                        catalogId: "1532" }, // ベスト
];

// ========================================
// 産直 Top 6 (specialty 全6点)
// アスパラ各サイズ + じゃが30kg
// ========================================
export const rankingSpecialty: RankingEntry[] = [
  { rank: 1, prevRank: 2, sales: 187, storeNote: "今年の出来は上々。甘みと太さが揃ったロット",                                catalogId: "3009" }, // 2.0kg
  { rank: 2, prevRank: 1, sales: 174, storeNote: "贈答需要が伸びています。化粧箱対応",                                        catalogId: "3006" }, // 1.5kg
  { rank: 3, prevRank: 3, sales: 156, storeNote: "ご家庭でまず試したい方に",                                                  catalogId: "3004" }, // 1.0kg
  { rank: 4, prevRank: 5, sales: 142, storeNote: "業務・直売所向け。配送調整可",                                              catalogId: "3010" }, // 4.0kg
  { rank: 5, prevRank: 4, sales: 108, storeNote: "オホーツクの男爵。煮物・揚げ物に",                                          catalogId: "572"  }, // じゃが30kg
  { rank: 6, prevRank: 6, sales: 75,  storeNote: "毎週入荷数限定。早期予約推奨",                                              catalogId: "3012" }, // 8.0kg
];

// ========================================
// アパレル Top 20 (Patagonia R1 / Nano / Retro-X など人気どころ)
// ========================================
export const rankingApparel: RankingEntry[] = [
  { rank: 1,  prevRank: 3,  sales: 128, storeNote: "今期最も動きが早いモデル。在庫薄",                                        catalogId: "1115" }, // R1エア フルジップ
  { rank: 2,  prevRank: 1,  sales: 121,                                                                                       catalogId: "1109" }, // ナノ・パフ・ベスト
  { rank: 3,  prevRank: 4,  sales: 115, storeNote: "定番中の定番。サイズ揃い豊富",                                            catalogId: "1167" }, // クラシック・レトロX ベスト
  { rank: 4,  prevRank: 2,  sales: 102,                                                                                       catalogId: "1093" }, // グラナイト・クレスト
  { rank: 5,  prevRank: 7,  sales: 96,                                                                                        catalogId: "1196" }, // サーマル・エアシェッド
  { rank: 6,  prevRank: 5,  sales: 91,                                                                                        catalogId: "1131" }, // グラナイト・クレスト XS
  { rank: 7,  prevRank: 9,  sales: 87,                                                                                        catalogId: "1350" }, // クラシック・レトロX ジャケット
  { rank: 8,  prevRank: 6,  sales: 83,                                                                                        catalogId: "1454" }, // ベスト
  { rank: 9,  prevRank: 11, sales: 79,                                                                                        catalogId: "1465" }, // プルオーバー
  { rank: 10, prevRank: 8,  sales: 75,                                                                                        catalogId: "1478" }, // ベスト
  { rank: 11, prevRank: 13, sales: 71,                                                                                        catalogId: "1490" }, // プルオーバー
  { rank: 12, prevRank: 10, sales: 68,                                                                                        catalogId: "1395" }, // その他
  { rank: 13, prevRank: 15, sales: 64,                                                                                        catalogId: "1388" }, // ジャケット
  { rank: 14, prevRank: 12, sales: 60,                                                                                        catalogId: "1532" }, // ベスト
  { rank: 15, prevRank: 17, sales: 57,                                                                                        catalogId: "1536" }, // プルオーバー
  { rank: 16, prevRank: 14, sales: 54, storeNote: "色味の良いロットが入荷",                                                   catalogId: "1548" }, // プルオーバー
  { rank: 17, prevRank: 19, sales: 51,                                                                                        catalogId: "1553" }, // ベスト
  { rank: 18, prevRank: 16, sales: 48,                                                                                        catalogId: "1571" }, // ベスト
  { rank: 19, prevRank: 20, sales: 45,                                                                                        catalogId: "1587" }, // ジャケット
  { rank: 20, prevRank: 18, sales: 42,                                                                                        catalogId: "1603" }, // プルオーバー
];
