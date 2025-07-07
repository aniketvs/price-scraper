import { workerData, parentPort ,threadId} from 'worker_threads';
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

(async () => {
  const { siteId, url, selectors } = workerData;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  try {
console.log(`🧵 Worker started on threadId: ${threadId} for siteId: ${workerData.siteId}`);
    await page.goto(url, { timeout: 30000, waitUntil: 'domcontentloaded' });
    const content = await page.content();
    const $ = cheerio.load(content);

    $(selectors.item).each((_, el) => {
      const title = $(el).find(selectors.title).text().trim();
      const price = $(el).find(selectors.price).text().trim();
      const link = $(el).find(selectors.link).attr('href');
      if (title && price && link) {
        results.push({
          siteId,
          productName: title,
          price,
          link: link.startsWith('http') ? link : `https://${new URL(url).hostname}${link}`,
        });
      }
    });
  } catch (err) {
    console.error(`❌ Worker error for ${siteId}:`, err.message);
  } finally {
    await page.close();
    await browser.close();
    parentPort.postMessage(results);
  }
})();
