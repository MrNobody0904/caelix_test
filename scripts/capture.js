import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/prana/.gemini/antigravity/brain/cf8be2b3-82cd-43ee-9eda-2bafde70777d';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function capture() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=angle', '--use-angle=swiftshader'],
  });

  const page = await browser.newPage();

  const consoleLogs = [];
  page.on('console', (msg) => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
    console.log(`[Browser ${msg.type()}]`, msg.text());
  });

  page.on('pageerror', (err) => {
    console.error('[Browser PageError]', err.message);
  });

  // 1. Test 1440px Desktop Viewport
  console.log('Testing Desktop 1440px...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));

  // Screenshot Desktop Hero
  const desktopHeroPath = path.join(ARTIFACT_DIR, 'desktop-hero-1440.png');
  await page.screenshot({ path: desktopHeroPath });
  console.log('Saved:', desktopHeroPath);

  // Scroll down smoothly through the entire page to exercise GSAP & ScrollTrigger
  await page.evaluate(async () => {
    const scrollStep = 400;
    const totalHeight = document.body.scrollHeight;
    for (let pos = 0; pos < totalHeight; pos += scrollStep) {
      window.scrollTo(0, pos);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, totalHeight);
  });

  await new Promise((r) => setTimeout(r, 1000));

  // Screenshot Desktop Full Page
  const desktopFullPath = path.join(ARTIFACT_DIR, 'desktop-full-1440.png');
  await page.screenshot({ path: desktopFullPath, fullPage: true });
  console.log('Saved:', desktopFullPath);

  // 2. Test 390px Mobile Viewport (iPhone 14/15 size)
  console.log('Testing Mobile 390px...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));

  // Screenshot Mobile Hero
  const mobileHeroPath = path.join(ARTIFACT_DIR, 'mobile-hero-390.png');
  await page.screenshot({ path: mobileHeroPath });
  console.log('Saved:', mobileHeroPath);

  // Scroll through mobile
  await page.evaluate(async () => {
    const scrollStep = 300;
    const totalHeight = document.body.scrollHeight;
    for (let pos = 0; pos < totalHeight; pos += scrollStep) {
      window.scrollTo(0, pos);
      await new Promise((r) => setTimeout(r, 60));
    }
  });

  await new Promise((r) => setTimeout(r, 800));

  // Screenshot Mobile Pricing section specifically to verify Team card is first
  const mobilePricingElement = await page.$('#pricing');
  if (mobilePricingElement) {
    const mobilePricingPath = path.join(ARTIFACT_DIR, 'mobile-pricing-390.png');
    await mobilePricingElement.screenshot({ path: mobilePricingPath });
    console.log('Saved:', mobilePricingPath);
  }

  // Screenshot Mobile Full Page
  const mobileFullPath = path.join(ARTIFACT_DIR, 'mobile-full-390.png');
  await page.screenshot({ path: mobileFullPath, fullPage: true });
  console.log('Saved:', mobileFullPath);

  await browser.close();

  // Filter console logs for errors or warnings
  const errors = consoleLogs.filter((log) => log.type === 'error');
  console.log('Total console errors found:', errors.length);
  if (errors.length > 0) {
    console.error('Errors:', errors);
  }
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
