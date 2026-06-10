// Auto-generated from catalog.ts — 編集禁止: 再生成は scripts/build-variants.py
// 同一商品のサイズ/重量バリエーションをまとめたグループ定義。

export type Variant = {
  slug: string;
  id: string;
  label: string;
  price: number;
  size?: string;
  weight?: string;
  image: string | null;
};

export type VariantGroup = {
  key: string;
  baseTitle: string;
  category: "specialty" | "apparel";
  variants: Variant[];
};

export const variantGroups: VariantGroup[] = [
  {
    key: "spec-北海道オホーツク小清水町産アスパラガス",
    baseTitle: "北海道オホーツク小清水町産アスパラガス",
    category: "specialty",
    variants: [
      { slug: "送料込み■-北海道オホーツク小清水町産アスパラ", id: "3004", label: "1.0kg", price: 3150, weight: "1.0kg", image: "/source-images/files/product-3012-shipping-included-8-0kg-hokkaido-okhotsk-koshimizu-asparagus-8-0kg-3005-image.jpeg" },
      { slug: "送料込み■-北海道オホーツク小清水町産アスパ-2", id: "3006", label: "1.5kg", price: 4100, weight: "1.5kg", image: "/source-images/files/product-3012-shipping-included-8-0kg-hokkaido-okhotsk-koshimizu-asparagus-8-0kg-3005-image.jpeg" },
      { slug: "送料込み■-北海道オホーツク小清水町産アスパ-3", id: "3009", label: "2.0kg", price: 5000, weight: "2.0kg", image: "/source-images/files/product-3012-shipping-included-8-0kg-hokkaido-okhotsk-koshimizu-asparagus-8-0kg-3005-image.jpeg" },
      { slug: "送料込み■-北海道オホーツク小清水町産アスパ-4", id: "3010", label: "4.0kg", price: 8700, weight: "4.0kg", image: "/source-images/files/product-3012-shipping-included-8-0kg-hokkaido-okhotsk-koshimizu-asparagus-8-0kg-3005-image.jpeg" },
      { slug: "送料込み■-北海道オホーツク小清水町産アスパ-5", id: "3012", label: "8.0kg", price: 15800, weight: "8.0kg", image: "/source-images/files/product-3012-アスパラImage.jpeg" },
    ],
  },
  {
    key: "app-1103",
    baseTitle: "パタゴニア M’s ナノ・パフ・ベスト / Conifer Green (CIFG)",
    category: "apparel",
    variants: [
      { slug: "【新品xs】-パタゴニア-ｍs-ナノ・パフ・ベスト-■-pat", id: "1103", label: "XS", price: 14000, size: "XS", image: "/source-images/files/product-1103-i-img1200x900-17470163407471uv7oir12566.jpg" },
      { slug: "【新品s】-パタゴニア-ｍs-ナノ・パフ・ベスト-■-pata", id: "1109", label: "S", price: 14000, size: "S", image: "/source-images/files/product-1109-i-img1200x900-17470163407471uv7oir12566.jpg" },
    ],
  },
  {
    key: "app-1542",
    baseTitle: "パタゴニア M’s ナノ・パフ・ベスト / Lagom Blue (LMBE)",
    category: "apparel",
    variants: [
      { slug: "【新品xs】パタゴニア-ms-ナノ・パフ・ベスト-■-patagonia-la", id: "1542", label: "XS", price: 14000, size: "XS", image: "/source-images/files/product-1542-i-img1200x840-17468820009336onpktr34.jpg" },
      { slug: "【新品s】パタゴニア-ms-ナノ・パフ・ベスト-■-patagonia-lag", id: "1661", label: "S", price: 14000, size: "S", image: "/source-images/files/product-1661-i-img1200x840-17468820009336onpktr34.jpg" },
      { slug: "　【新品m】パタゴニア-ms-ナノ・パフ・ベスト-■-pata", id: "1840", label: "M", price: 15000, size: "M", image: "/source-images/files/product-1840-i-img1200x840-17468820009336onpktr34.jpg" },
    ],
  },
  {
    key: "app-1654",
    baseTitle: "パタゴニア M’s R1エア・ジップネック / Mangrove Red(MANR)",
    category: "apparel",
    variants: [
      { slug: "【未使用s】パタゴニア-ms-r1エア・ジップネック-■-pa", id: "1654", label: "S", price: 14500, size: "S", image: "/source-images/files/product-1654-P10100081-1.jpg" },
      { slug: "【未使用m】パタゴニア-ms-r1エア・ジップネック-■-pa", id: "1660", label: "M", price: 14500, size: "M", image: "/source-images/files/product-1660-P10100081-1.jpg" },
    ],
  },
  {
    key: "app-1688",
    baseTitle: "パタゴニア M’s ナチュラル・ブレンド・レトロ・カーディガン / Burnished Red (BURR)",
    category: "apparel",
    variants: [
      { slug: "■50周年記念モデル■【新品s】パタゴニア-ms-ナチ", id: "1688", label: "S", price: 41500, size: "S", image: "/source-images/files/product-1688-P10100241-1.jpg" },
      { slug: "■50周年記念モデル■【未使用m】パタゴニア-ms-ナ", id: "2778", label: "M", price: 41500, size: "M", image: "/source-images/files/product-2778-P10100241-1.jpg" },
    ],
  },
  {
    key: "app-1707",
    baseTitle: "バス・プロ・ショップス M’s FLAG TEE / BASS PRO SHOPS ネイビー (Navy Heather)",
    category: "apparel",
    variants: [
      { slug: "■送料込■【新品s】バス・プロ・ショップス-ms-flag-t", id: "1707", label: "S", price: 4200, size: "S", image: "/source-images/files/product-1707-P10100581.jpg" },
      { slug: "■送料込■【新品m】バス・プロ・ショップス-ms-flag-t", id: "1701", label: "M", price: 4200, size: "M", image: "/source-images/files/product-1701-P10100581.jpg" },
    ],
  },
  {
    key: "app-1760",
    baseTitle: "パタゴニア M’s クラシック・レトロX・ベスト / Pitch Blue (PIBL)",
    category: "apparel",
    variants: [
      { slug: "【新品xs】-パタゴニア-ms-クラシック・レトロx・ベ", id: "1760", label: "XS", price: 16200, size: "XS", image: "/source-images/files/product-1760-P10100191-2.jpg" },
      { slug: "【新品s】-パタゴニア-ms-クラシック・レトロx・ベ", id: "2145", label: "S", price: 17200, size: "S", image: "/source-images/files/product-2145-shiretoko_patag120_1_d_20250101172106.jpg" },
    ],
  },
  {
    key: "app-1767",
    baseTitle: "パタゴニア M’s クラシック・レトロX・ジャケット / Pitch Blue (PIBL)",
    category: "apparel",
    variants: [
      { slug: "【新品xs】-パタゴニア-ms-クラシック・レトロx・ジ", id: "1767", label: "XS", price: 27500, size: "XS", image: "/source-images/files/product-1767-P10100231-2.jpg" },
      { slug: "【新品s】-パタゴニア-ms-クラシック・レトロx・ジ", id: "2218", label: "S", price: 27500, size: "S", image: "/source-images/files/product-2218-shiretoko_patag169_i_20250930172402.jpg" },
      { slug: "【新品m】-パタゴニア-ms-クラシック・レトロx・ジ", id: "2224", label: "M", price: 28000, size: "M", image: "/source-images/files/product-2224-shiretoko_patag80_i_20240511115653.jpg" },
    ],
  },
  {
    key: "app-1907",
    baseTitle: "パタゴニア M’s ナノ・パフ・ジャケット / Sage Khaki (SKA)",
    category: "apparel",
    variants: [
      { slug: "【新品s】パタゴニア-ｍs-ナノ・パフ・ジャケッ", id: "1907", label: "S", price: 22200, size: "S", image: "/source-images/files/product-1907-shiretoko_patag147_i_20250513211651.jpg" },
      { slug: "【新品l】パタゴニア-ms-ナノ・パフ・ジャケット", id: "2878", label: "L", price: 27800, size: "L", image: "/source-images/files/product-2878-P10100461-1.jpg" },
    ],
  },
  {
    key: "app-1943",
    baseTitle: "パタゴニア M’s クラシック・レトロX・ベスト / Natural w/Touring Red(NLTO)",
    category: "apparel",
    variants: [
      { slug: "【新品s】パタゴニア-ms-クラシック・レトロx・ベ", id: "1943", label: "S", price: 17200, size: "S", image: "/source-images/files/product-1943-shiretoko_patag63_i_20240426221135.jpg" },
      { slug: "【新品m】パタゴニア-ms-クラシック・レトロx・ベ", id: "1950", label: "M", price: 17200, size: "M", image: "/source-images/files/product-1950-shiretoko_patag63_i_20240426221135.jpg" },
      { slug: "【新品l】パタゴニア-ms-クラシック・レトロx・ベ", id: "1951", label: "L", price: 18200, size: "L", image: "/source-images/files/product-1951-shiretoko_patag63_i_20240426221135.jpg" },
    ],
  },
  {
    key: "app-2109",
    baseTitle: "パタゴニア M’s R1エア・ジップネック / Black (BLK)",
    category: "apparel",
    variants: [
      { slug: "【新品xs】-パタゴニア-ｍs-r1エア・ジップネック-■-p", id: "2109", label: "XS", price: 14400, size: "XS", image: "/source-images/files/product-2109-P10100451.jpg" },
      { slug: "【新品s】パタゴニア-ｍs-r1エア・ジップネック-■-pat", id: "2098", label: "S", price: 15000, size: "S", image: "/source-images/files/product-2098-P10100211.jpg" },
    ],
  },
  {
    key: "app-2237",
    baseTitle: "パタゴニア M’s クラシック・レトロX・ベスト / New Navy(NENA)",
    category: "apparel",
    variants: [
      { slug: "【新品xxs】-パタゴニア-ms-クラシック・レトロx・ベ", id: "2237", label: "XXS", price: 16000, size: "XXS", image: "/source-images/files/product-2237-shiretoko_pata14_i_20230406171603.jpg" },
      { slug: "【新品xs】-パタゴニア-ms-クラシック・レトロx・ベ-2", id: "2231", label: "XS", price: 17200, size: "XS", image: "/source-images/files/product-2231-shiretoko_pata14_i_20230406171603.jpg" },
    ],
  },
  {
    key: "app-2262",
    baseTitle: "パタゴニア M’s R1エア・フルジップ・フーディ / Endless Blue (ENLB)",
    category: "apparel",
    variants: [
      { slug: "【新品s】-パタゴニア-ms-r1-エア・フルジップ・フー-3", id: "2262", label: "S", price: 21000, size: "S", image: "/source-images/files/product-2262-P10100711.jpg" },
      { slug: "【新品m】パタゴニア-ms-r1エア・フルジップ・フー", id: "2954", label: "M", price: 14200, size: "M", image: "/source-images/files/product-2955-new-l-patagonia-ws-r1-air-zip-neck-patagonia-black-blk-2950-p1010057-1.jpg" },
    ],
  },
  {
    key: "app-2309",
    baseTitle: "パタゴニア M’s キャプリーン・サーマル・フーディ / Seabird Grey (SBDY)",
    category: "apparel",
    variants: [
      { slug: "【新品s】パタゴニア-ｍs-キャプリーン・サーマ-3", id: "2309", label: "S", price: 16000, size: "S", image: "/source-images/files/product-2309-P10100681-1.jpg" },
      { slug: "【新品m】パタゴニア-ｍs-キャプリーン・サーマ", id: "2484", label: "M", price: 16200, size: "M", image: "/source-images/files/product-2484-P10100681.jpg" },
    ],
  },
  {
    key: "app-2332",
    baseTitle: "パタゴニア M’s ボックス・キルティング・プルオーバー / Tidepool Blue (TIDB)",
    category: "apparel",
    variants: [
      { slug: "■日本未発売■【新品s】パタゴニア-ms-ボックス", id: "2332", label: "S", price: 14400, size: "S", image: "/source-images/files/product-2332-shiretoko_pata96_i_20231211202838.jpg" },
      { slug: "■日本未発売■【新品m】パタゴニア-ms-ボックス", id: "2337", label: "M", price: 14400, size: "M", image: "/source-images/files/product-2337-shiretoko_pata96_i_20231211202838.jpg" },
    ],
  },
  {
    key: "app-2463",
    baseTitle: "パタゴニア M’s R1 ベスト / Cascade Green (CASG)",
    category: "apparel",
    variants: [
      { slug: "【新品m】パタゴニア-ms-r1-ベスト-■-patagonia-■cascade-green-casg", id: "2463", label: "M", price: 13800, size: "M", image: "/source-images/files/product-2463-P10100441-2.jpg" },
      { slug: "【新品l】パタゴニア-ms-r1-ベスト-■-patagonia-■cascade-green-casg", id: "2449", label: "L", price: 13800, size: "L", image: "/source-images/files/product-2449-P10100441-2.jpg" },
    ],
  },
  {
    key: "app-2483",
    baseTitle: "パタゴニア M’s リツール・1/2ジップ・プルオーバー / Black (BLK)",
    category: "apparel",
    variants: [
      { slug: "【新品s】パタゴニア-ms-リツール・1-2ジップ・プル", id: "2483", label: "S", price: 17200, size: "S", image: "/source-images/files/product-2483-P10100061.jpg" },
      { slug: "【新品m】パタゴニア-ms-リツール・1-2ジップ・プル", id: "2477", label: "M", price: 17200, size: "M", image: "/source-images/files/product-2477-P10100061.jpg" },
    ],
  },
  {
    key: "app-2538",
    baseTitle: "パタゴニア M’s R1 テックフェイス・フーディ / Graze Green (GRZG)",
    category: "apparel",
    variants: [
      { slug: "【新品s】パタゴニア-ms-r1-テックフェイス・フーデ-3", id: "2538", label: "S", price: 22000, size: "S", image: "/source-images/files/product-2538-P10100271.jpg" },
      { slug: "【新品l】パタゴニア-ms-r1-テックフェイス・フーデ", id: "2532", label: "L", price: 22800, size: "L", image: "/source-images/files/product-2532-P10100271.jpg" },
    ],
  },
  {
    key: "app-2581",
    baseTitle: "パタゴニア M’s グラナイト・クレスト・レイン・ジャケット / Forge Grey (FGE)",
    category: "apparel",
    variants: [
      { slug: "【新品s】パタゴニア-ｍs-グラナイト・クレスト", id: "2581", label: "S", price: 26000, size: "S", image: "/source-images/files/product-2581-shiretoko_patag112_i_20241229161643-1.jpg" },
      { slug: "【新品m】-パタゴニア-ｍs-グラナイト・クレスト-2", id: "2090", label: "M", price: 25800, size: "M", image: "/source-images/files/product-2090-i-img1200x900-17354541043484pcp2yn357342.jpg" },
      { slug: "【新品l】-パタゴニア-ｍs-グラナイト・クレスト", id: "1727", label: "L", price: 27600, size: "L", image: "/source-images/files/product-1727-i-img1200x900-17354541043484pcp2yn357342.jpg" },
    ],
  },
  {
    key: "app-2611",
    baseTitle: "パタゴニア M’s グラナイト・クレスト・レイン・パンツ / Black (BLK)",
    category: "apparel",
    variants: [
      { slug: "【新品xs】-パタゴニア-ｍs-グラナイト・クレスト-2", id: "2611", label: "XS", price: 21800, size: "XS", image: "/source-images/files/product-2611-shiretoko_patag125_i_20250103110051.jpg" },
      { slug: "【新品s】-パタゴニア-ｍs-グラナイト・クレスト", id: "2087", label: "S", price: 21800, size: "S", image: "/source-images/files/product-2087-i-img1024x904-17358686214267ddlafo469465.jpg" },
      { slug: "【新品m】-パタゴニア-ｍs-グラナイト・クレスト", id: "1733", label: "M", price: 21800, size: "M", image: "/source-images/files/product-1733-i-img1024x904-17358686214267ddlafo469465.jpg" },
      { slug: "1518", id: "1518", label: "L", price: 21800, size: "L", image: "/source-images/files/product-1518-i-img1024x904-17358686214267ddlafo469465.jpg" },
    ],
  },
  {
    key: "app-2628",
    baseTitle: "ザ・ノース・フェイス M’s Half Dome Tee / TNF Medium Grey Heather",
    category: "apparel",
    variants: [
      { slug: "【新品s】ザ・ノース・フェイス-ms-half-dome-tee-■the-north-face-■-tnf-medium-g", id: "2628", label: "S", price: 3500, size: "S", image: "/source-images/files/product-2628-m78029296003_31.jpg" },
      { slug: "【新品m】ザ・ノース・フェイス-ms-half-dome-tee-■the-north-face-■-tnf-medium-g", id: "2635", label: "M", price: 3500, size: "M", image: "/source-images/files/product-2635-m78029296003_31.jpg" },
    ],
  },
  {
    key: "app-2643",
    baseTitle: "ザ・ノース・フェイス M’s Throwback Tee / TNF Medium Grey Heather",
    category: "apparel",
    variants: [
      { slug: "【新品s】ザ・ノース・フェイス-ms-throwback-tee-■the-north-face-■-tnf-medium-g", id: "2643", label: "S", price: 3500, size: "S", image: "/source-images/files/product-2643-111111.jpg" },
      { slug: "【新品m】ザ・ノース・フェイス-ms-throwback-tee-■the-north-face-■-tnf-medium-g", id: "2636", label: "M", price: 3500, size: "M", image: "/source-images/files/product-2636-111111.jpg" },
    ],
  },
  {
    key: "app-2826",
    baseTitle: "パタゴニア M’s クラシック・レトロX・ベスト / Clement Blue (CLMB)",
    category: "apparel",
    variants: [
      { slug: "【新品s】パタゴニア-ms-クラシック・レトロx・ベ-5", id: "2826", label: "S", price: 24000, size: "S", image: "/source-images/files/product-2832-new-m-patagonia-ms-x-patagonia-clement-blue-clmb-2827-p1010073-1.jpg" },
      { slug: "【新品m】パタゴニア-ms-クラシック・レトロx・ベ-2", id: "2465", label: "M", price: 21800, size: "M", image: "/source-images/files/product-2465-P10100731.jpg" },
    ],
  },
  {
    key: "app-2839",
    baseTitle: "パタゴニア M’s ジャクソン・グレイシャー・レイン・ジャケット / Ink Black (INBK)",
    category: "apparel",
    variants: [
      { slug: "【新品xs】パタゴニア-ms-ジャクソン・グレイシャ", id: "2839", label: "XS", price: 30400, size: "XS", image: "/source-images/files/product-2839-P10100751.jpg" },
      { slug: "【新品s】パタゴニア-ms-ジャクソン・グレイシャ", id: "2833", label: "S", price: 30400, size: "S", image: "/source-images/files/product-2839-new-xs-patagonia-ms-patagonia-ink-black-inbk-2834-p1010075-1.jpg" },
    ],
  },
  {
    key: "app-2897",
    baseTitle: "パタゴニア W’s ナノ・パフ・ジャケット / Black (BLK)",
    category: "apparel",
    variants: [
      { slug: "【新品xs】パタゴニア-ws-ナノ・パフ・ジャケット", id: "2897", label: "XS", price: 27300, size: "XS", image: "/source-images/files/product-2897-P10100671-2.jpg" },
      { slug: "【新品s】パタゴニア-ws-ナノ・パフ・ジャケット", id: "2891", label: "S", price: 27300, size: "S", image: "/source-images/files/product-2897-new-xs-patagonia-ws-patagonia-black-blk-2892-p1010067-1.jpg" },
    ],
  },
  {
    key: "app-2949",
    baseTitle: "パタゴニア W’s R1エア・ジップネック / Black (BLK)",
    category: "apparel",
    variants: [
      { slug: "【新品s】パタゴニア-ws-r1エア・ジップネック-■-patagonia", id: "2949", label: "S", price: 14200, size: "S", image: "/source-images/files/product-2955-new-l-patagonia-ws-r1-air-zip-neck-patagonia-black-blk-2950-p1010057-1.jpg" },
      { slug: "【新品l】パタゴニア-ws-r1エア・ジップネック-■-patagonia", id: "2955", label: "L", price: 14200, size: "L", image: "/source-images/files/product-2955-P10100571-2.jpg" },
    ],
  },
  {
    key: "app-2983",
    baseTitle: "パタゴニア M’s R1 エア・フルジップ・フーディ / Clement Blue (CLMB)",
    category: "apparel",
    variants: [
      { slug: "【新品s】パタゴニア-ms-r1-エア・フルジップ・フー-3", id: "2983", label: "S", price: 22200, size: "S", image: "/source-images/files/product-2989-new-m-patagonia-ms-r1-air-full-zip-hoodie-patagonia-clement-blue-clmb-2984-p1010080-1.jpg" },
      { slug: "【新品m】パタゴニア-ms-r1-エア・フルジップ・フー", id: "2989", label: "M", price: 22200, size: "M", image: "/source-images/files/product-2989-P10100801.jpg" },
    ],
  },
  {
    key: "app-2990",
    baseTitle: "パタゴニア M’s R1 エア・フルジップ・フーディ / Dried Vanilla (DVL)",
    category: "apparel",
    variants: [
      { slug: "【新品m】パタゴニア-ms-r1-エア・フルジップ・フー-2", id: "2990", label: "M", price: 22200, size: "M", image: "/source-images/files/product-2996-new-l-patagonia-ms-r1-air-full-zip-hoodie-patagonia-dried-vanilla-dvl-2991-p1010018-1.jpg" },
      { slug: "【新品l】パタゴニア-ms-r1-エア・フルジップ・フー", id: "2996", label: "L", price: 22200, size: "L", image: "/source-images/files/product-2996-P10100181.jpg" },
    ],
  },
];

export const slugToGroup: Record<string, string> = {
  "送料込み■-北海道オホーツク小清水町産アスパラ": "spec-北海道オホーツク小清水町産アスパラガス",
  "送料込み■-北海道オホーツク小清水町産アスパ-2": "spec-北海道オホーツク小清水町産アスパラガス",
  "送料込み■-北海道オホーツク小清水町産アスパ-3": "spec-北海道オホーツク小清水町産アスパラガス",
  "送料込み■-北海道オホーツク小清水町産アスパ-4": "spec-北海道オホーツク小清水町産アスパラガス",
  "送料込み■-北海道オホーツク小清水町産アスパ-5": "spec-北海道オホーツク小清水町産アスパラガス",
  "【新品xs】-パタゴニア-ｍs-ナノ・パフ・ベスト-■-pat": "app-1103",
  "【新品s】-パタゴニア-ｍs-ナノ・パフ・ベスト-■-pata": "app-1103",
  "【新品xs】パタゴニア-ms-ナノ・パフ・ベスト-■-patagonia-la": "app-1542",
  "【新品s】パタゴニア-ms-ナノ・パフ・ベスト-■-patagonia-lag": "app-1542",
  "　【新品m】パタゴニア-ms-ナノ・パフ・ベスト-■-pata": "app-1542",
  "【未使用s】パタゴニア-ms-r1エア・ジップネック-■-pa": "app-1654",
  "【未使用m】パタゴニア-ms-r1エア・ジップネック-■-pa": "app-1654",
  "■50周年記念モデル■【新品s】パタゴニア-ms-ナチ": "app-1688",
  "■50周年記念モデル■【未使用m】パタゴニア-ms-ナ": "app-1688",
  "■送料込■【新品s】バス・プロ・ショップス-ms-flag-t": "app-1707",
  "■送料込■【新品m】バス・プロ・ショップス-ms-flag-t": "app-1707",
  "【新品xs】-パタゴニア-ms-クラシック・レトロx・ベ": "app-1760",
  "【新品s】-パタゴニア-ms-クラシック・レトロx・ベ": "app-1760",
  "【新品xs】-パタゴニア-ms-クラシック・レトロx・ジ": "app-1767",
  "【新品s】-パタゴニア-ms-クラシック・レトロx・ジ": "app-1767",
  "【新品m】-パタゴニア-ms-クラシック・レトロx・ジ": "app-1767",
  "【新品s】パタゴニア-ｍs-ナノ・パフ・ジャケッ": "app-1907",
  "【新品l】パタゴニア-ms-ナノ・パフ・ジャケット": "app-1907",
  "【新品s】パタゴニア-ms-クラシック・レトロx・ベ": "app-1943",
  "【新品m】パタゴニア-ms-クラシック・レトロx・ベ": "app-1943",
  "【新品l】パタゴニア-ms-クラシック・レトロx・ベ": "app-1943",
  "【新品xs】-パタゴニア-ｍs-r1エア・ジップネック-■-p": "app-2109",
  "【新品s】パタゴニア-ｍs-r1エア・ジップネック-■-pat": "app-2109",
  "【新品xxs】-パタゴニア-ms-クラシック・レトロx・ベ": "app-2237",
  "【新品xs】-パタゴニア-ms-クラシック・レトロx・ベ-2": "app-2237",
  "【新品s】-パタゴニア-ms-r1-エア・フルジップ・フー-3": "app-2262",
  "【新品m】パタゴニア-ms-r1エア・フルジップ・フー": "app-2262",
  "【新品s】パタゴニア-ｍs-キャプリーン・サーマ-3": "app-2309",
  "【新品m】パタゴニア-ｍs-キャプリーン・サーマ": "app-2309",
  "■日本未発売■【新品s】パタゴニア-ms-ボックス": "app-2332",
  "■日本未発売■【新品m】パタゴニア-ms-ボックス": "app-2332",
  "【新品m】パタゴニア-ms-r1-ベスト-■-patagonia-■cascade-green-casg": "app-2463",
  "【新品l】パタゴニア-ms-r1-ベスト-■-patagonia-■cascade-green-casg": "app-2463",
  "【新品s】パタゴニア-ms-リツール・1-2ジップ・プル": "app-2483",
  "【新品m】パタゴニア-ms-リツール・1-2ジップ・プル": "app-2483",
  "【新品s】パタゴニア-ms-r1-テックフェイス・フーデ-3": "app-2538",
  "【新品l】パタゴニア-ms-r1-テックフェイス・フーデ": "app-2538",
  "【新品s】パタゴニア-ｍs-グラナイト・クレスト": "app-2581",
  "【新品m】-パタゴニア-ｍs-グラナイト・クレスト-2": "app-2581",
  "【新品l】-パタゴニア-ｍs-グラナイト・クレスト": "app-2581",
  "【新品xs】-パタゴニア-ｍs-グラナイト・クレスト-2": "app-2611",
  "【新品s】-パタゴニア-ｍs-グラナイト・クレスト": "app-2611",
  "【新品m】-パタゴニア-ｍs-グラナイト・クレスト": "app-2611",
  "1518": "app-2611",
  "【新品s】ザ・ノース・フェイス-ms-half-dome-tee-■the-north-face-■-tnf-medium-g": "app-2628",
  "【新品m】ザ・ノース・フェイス-ms-half-dome-tee-■the-north-face-■-tnf-medium-g": "app-2628",
  "【新品s】ザ・ノース・フェイス-ms-throwback-tee-■the-north-face-■-tnf-medium-g": "app-2643",
  "【新品m】ザ・ノース・フェイス-ms-throwback-tee-■the-north-face-■-tnf-medium-g": "app-2643",
  "【新品s】パタゴニア-ms-クラシック・レトロx・ベ-5": "app-2826",
  "【新品m】パタゴニア-ms-クラシック・レトロx・ベ-2": "app-2826",
  "【新品xs】パタゴニア-ms-ジャクソン・グレイシャ": "app-2839",
  "【新品s】パタゴニア-ms-ジャクソン・グレイシャ": "app-2839",
  "【新品xs】パタゴニア-ws-ナノ・パフ・ジャケット": "app-2897",
  "【新品s】パタゴニア-ws-ナノ・パフ・ジャケット": "app-2897",
  "【新品s】パタゴニア-ws-r1エア・ジップネック-■-patagonia": "app-2949",
  "【新品l】パタゴニア-ws-r1エア・ジップネック-■-patagonia": "app-2949",
  "【新品s】パタゴニア-ms-r1-エア・フルジップ・フー-3": "app-2983",
  "【新品m】パタゴニア-ms-r1-エア・フルジップ・フー": "app-2983",
  "【新品m】パタゴニア-ms-r1-エア・フルジップ・フー-2": "app-2990",
  "【新品l】パタゴニア-ms-r1-エア・フルジップ・フー": "app-2990",
};
