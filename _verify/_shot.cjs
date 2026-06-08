const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

(async () => {
  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch (e) {
    // Try global; if missing, install locally to /tmp to avoid polluting site
    const cwd = process.cwd();
    const installDir = path.join("/tmp", "site-build-puppeteer");
    fs.mkdirSync(installDir, { recursive: true });
    spawnSync("npm", ["init", "-y"], { cwd: installDir, stdio: "ignore" });
    spawnSync("npm", ["install", "puppeteer@22", "--silent"], {
      cwd: installDir,
      stdio: "inherit",
    });
    puppeteer = require(path.join(installDir, "node_modules", "puppeteer"));
    process.chdir(cwd);
  }

  const outDir = process.env.OUT_DIR;
  const verifyDir = process.env.VERIFY_DIR;
  const siteDir = process.env.SITE_DIR;
  const isNext = outDir.endsWith(".next");

  let targetUrl;
  let serverProc;

  if (isNext) {
    const port = 4321;
    const { spawn } = require("node:child_process");
    serverProc = spawn("npx", ["next", "start", "-p", String(port)], {
      cwd: siteDir,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PORT: String(port) },
    });
    await new Promise((resolve) => setTimeout(resolve, 4000));
    targetUrl = `http://127.0.0.1:${port}/`;
  } else {
    // Static: serve via file:// — find index.html
    const idx = path.join(outDir, "index.html");
    if (!fs.existsSync(idx)) {
      console.error("[shot] index.html not found in", outDir);
      process.exit(1);
    }
    targetUrl = "file://" + idx;
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const widths = [320, 768, 1280];
  for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: Math.round((w * 9) / 16) });
    try {
      await page.goto(targetUrl, { waitUntil: "networkidle0", timeout: 30000 });
    } catch (e) {
      console.error(`[shot] navigation failed at ${w}px:`, e.message);
    }
    const out = path.join(verifyDir, `viewport-${w}.png`);
    await page.screenshot({ path: out, fullPage: true });
    console.log(`[shot] wrote ${out}`);
    await page.close();
  }
  await browser.close();
  if (serverProc) serverProc.kill();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
