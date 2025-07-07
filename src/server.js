import express from "express";
import dotenv from "dotenv";
import pricesRoute from "./api/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use("/prices", pricesRoute);


app.get("/", (req, res) => {
  res.send("✅ Price Scraper API is running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port :- ${PORT}`);
});
