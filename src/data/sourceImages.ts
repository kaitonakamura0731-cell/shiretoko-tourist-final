import { existsSync } from "node:fs";

const imageExts = ["avif", "webp", "jpg", "jpeg", "png"];

export type SourceImageSlot = {
  src: string | null;
  alt: string;
  stem: string;
  label: string;
};

export function sourceImage(...candidates: (string | string[])[]): string | null {
  for (const candidate of candidates.flat()) {
    const candidatePaths = /\.[a-z0-9]+$/i.test(candidate)
      ? [candidate]
      : imageExts.map((ext) => `${candidate}.${ext}`);

    for (const path of candidatePaths) {
      const file = new URL(`../../public/source-images/${path}`, import.meta.url);
      if (existsSync(file)) {
        return `/source-images/${path}`;
      }
    }
  }

  return null;
}

export function imageSlot(stem: string, alt: string, label: string, fallback: string[] = []): SourceImageSlot {
  return { src: sourceImage(stem, fallback), alt, stem, label };
}

export const siteMedia = {
  hero: imageSlot("hero-shiretoko", "斜里岳の朝霧・清里町のアスパラ畑とホステル", "hero-shiretoko", ["files/hero-shiretoko-okhotsk.jpg", "files/tour-hero-shiretoko-goko-spring.jpg"]),
  tourHero: imageSlot("tour-shiretoko", "知床五湖と斜里岳の早朝、ガイドツアー", "tour-shiretoko", ["files/tour-hero-shiretoko-goko-spring.jpg"]),
  story: imageSlot("story-ishida", "代表 石田富雄のポートレート", "story-ishida", ["files/staff-01.jpg"]),
  lineQr: imageSlot("line-qr", "LINE公式アカウント登録用QRコード", "line-qr"),
};

const productFallbacks: Record<string, string[]> = {
  asparagus: ["files/product-3012-shipping-included-8-0kg-hokkaido-okhotsk-koshimizu-asparagus-8-0kg-3005-image.jpeg"],
  "potato-onion": ["files/banner-potato-onion-sales.jpg"],
  "potato-danshaku": ["files/product-572-shipping-included-hokkaido-okhotsk-potato-30kg-573-img-0057.jpg"],
  "patagonia-hoodie": [
    "files/product-2989-new-m-patagonia-ms-r1-air-full-zip-hoodie-patagonia-clement-blue-clmb-2984-p1010080-1.jpg",
  ],
  "patagonia-r1-zip-neck": [
    "files/product-3019-new-s-patagonia-ms-r1-air-zip-neck-patagonia-clement-blue-clmb-3020-p1010032-1.jpg",
  ],
};

export function productImageForKey(imageKey: string, alt: string): SourceImageSlot {
  return imageSlot(`product-${imageKey}`, alt, `product-${imageKey}`, productFallbacks[imageKey] || []);
}
