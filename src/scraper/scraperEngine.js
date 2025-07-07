import { Worker } from 'worker_threads';
import path from 'path';

export function runScraperEngine(adapters) {
  const workerFile = path.resolve('./src/scraper/scraperWorker.js');

  const scrapePromises = adapters.map(
    (adapter) =>
      new Promise((resolve, reject) => {
        const worker = new Worker(workerFile, { workerData: adapter });

        worker.on('message', (data) => resolve(data));
        worker.on('error', reject);
        worker.on('exit', (code) => {
          if (code !== 0) reject(new Error(`Worker stopped with code ${code}`));
        });
      })
  );

  return Promise.all(scrapePromises).then((allResults) => allResults.flat());
}
