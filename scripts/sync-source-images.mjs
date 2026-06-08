import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const siteRoot = join(here, "..");
const projectRoot = join(siteRoot, "..", "..");
const sourceDir = join(projectRoot, "assets", "source-images");
const publicDir = join(siteRoot, "public", "source-images");
const allowed = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const referencedNestedImages = [
  "files/tour-hero-shiretoko-goko-spring.jpg",
  "files/staff-01.jpg",
  "files/product-3012-shipping-included-8-0kg-hokkaido-okhotsk-koshimizu-asparagus-8-0kg-3005-image.jpeg",
  "files/banner-potato-onion-sales.jpg",
  "files/product-572-shipping-included-hokkaido-okhotsk-potato-30kg-573-img-0057.jpg",
  "files/product-572-shipping-included-hokkaido-okhotsk-potato-30kg-574-m62372259786-2.jpg",
  "files/product-572-shipping-included-hokkaido-okhotsk-potato-30kg-575-m62372259786-3.jpg",
  "files/product-2989-new-m-patagonia-ms-r1-air-full-zip-hoodie-patagonia-clement-blue-clmb-2984-p1010080-1.jpg",
  "files/product-3019-new-s-patagonia-ms-r1-air-zip-neck-patagonia-clement-blue-clmb-3020-p1010032-1.jpg",
];

const filesToCopy = [];
const collectOne = (from) => {
  if (!existsSync(from) || !statSync(from).isFile()) return;
  if (!allowed.has(extname(from).toLowerCase())) return;
  filesToCopy.push(from);
};

if (!existsSync(sourceDir)) {
  console.log("Skipped image sync because assets/source-images was not found.");
  process.exit(0);
}

for (const entry of readdirSync(sourceDir)) {
  const from = join(sourceDir, entry);
  if (statSync(from).isFile()) {
    collectOne(from);
  }
}

for (const file of referencedNestedImages) {
  collectOne(join(sourceDir, file));
}

if (filesToCopy.length === 0) {
  console.log("Skipped image sync because no source images were found.");
  process.exit(0);
}

rmSync(publicDir, { recursive: true, force: true });
mkdirSync(publicDir, { recursive: true });

let copied = 0;
const copyOne = (from) => {
  const to = join(publicDir, relative(sourceDir, from));
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  copied += 1;
};

for (const file of filesToCopy) {
  copyOne(file);
}

console.log(`Synced ${copied} source image(s) from assets/source-images.`);
