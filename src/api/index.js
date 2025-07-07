import express from "express";
import { loadAdapters } from "../scraper/adapterLoader.js";
import { runScraperEngine } from "../scraper/scraperEngine.js";
import { prepareProducts } from "../aggregator/aggregator.js";
import { groupSimilarProducts } from "../aggregator/matcher.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { country, query } = req.query;

  if (!country || !query) {
    return res.status(400).json({ error: "Missing country or query." });
  }

  try {
    const adapters = loadAdapters(country, query);

    if (!adapters.length) {
      return res.status(404).json({ error: "No adapters found." });
    }

    const scraperResults = await runScraperEngine(adapters);

    const aggregatorResult=prepareProducts(scraperResults);

    const finalResult=groupSimilarProducts(aggregatorResult);

    res.status(200).json({
      status: "success",
      message: `Scraping completed for country= ${country}, query= ${query}`,
      count: finalResult.length,
      results:finalResult
    });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
