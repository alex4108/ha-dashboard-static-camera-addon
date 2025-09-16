const { chromium } = require('playwright');
const fs = require('fs');

const optionsFile = '/data/options.json';
let URL = 'http://homeassistant.local:8123/lovelace/0';
let TOKEN = process.env.SUPERVISOR_TOKEN || process.env.HASSIO_TOKEN || '';
let INTERVAL = 10;

try {
  const raw = fs.readFileSync(optionsFile);
  const opts = JSON.parse(raw);
  URL = opts.url || URL;
  TOKEN = opts.token || TOKEN; // Use options token if set
  INTERVAL = opts.interval || INTERVAL;
} catch (e) {
  console.warn('Failed to read /data/options.json, using defaults:', e);
}

const OUTPUT_FILE = '/config/www/dashboard.jpg';
if (!fs.existsSync('/config/www')) fs.mkdirSync('/config/www', { recursive: true });

(async () => {
  while (true) {
    try {
      const browser = await chromium.launch({ args: ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Append token to URL
      const authUrl = URL.includes('?') ? `${URL}&auth_token=${TOKEN}` : `${URL}?auth_token=${TOKEN}`;
      await page.goto(authUrl, { waitUntil: 'networkidle0' });
      await page.waitForTimeout(5000);

      await page.screenshot({ path: OUTPUT_FILE, fullPage: true });
      console.log(new Date().toISOString(), `Screenshot saved: ${OUTPUT_FILE}`);

      await browser.close();
    } catch (e) {
      console.error(new Date().toISOString(), 'Error capturing dashboard:', e);
    }

    await new Promise(resolve => setTimeout(resolve, INTERVAL * 1000));
  }
})();
