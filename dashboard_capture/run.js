const { chromium } = require('playwright');
const fs = require('fs');

// Read HA addon options from /data/options.json
const optionsFile = '/data/options.json';
let URL = 'http://homeassistant.local:8123/lovelace/0';
let TOKEN = '';
let INTERVAL = 10;

try {
  const raw = fs.readFileSync(optionsFile);
  const opts = JSON.parse(raw);
  URL = opts.url || URL;
  TOKEN = opts.token || TOKEN;
  INTERVAL = opts.interval || INTERVAL;
} catch (e) {
  console.warn('Failed to read /data/options.json, using defaults:', e);
}

const OUTPUT_FILE = '/config/www/dashboard.jpg';

(async () => {
  while (true) {
    try {
      const browser = await chromium.launch({ args: ['--no-sandbox'] });
      const page = await browser.newPage();

      // Append long-lived token for auth
      const authUrl = URL.includes('?') ? `${URL}&auth_token=${TOKEN}` : `${URL}?auth_token=${TOKEN}`;
      await page.goto(authUrl, { waitUntil: 'networkidle' });

      // Wait for JS widgets
      await page.waitForTimeout(5000);

      // Take screenshot
      await page.screenshot({ path: OUTPUT_FILE, fullPage: true });
      console.log(`Screenshot saved: ${OUTPUT_FILE}`);

      await browser.close();
    } catch (e) {
      console.error('Error capturing dashboard:', e);
    }

    await new Promise(resolve => setTimeout(resolve, INTERVAL * 1000));
  }
})();
