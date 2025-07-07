import {
  normalizeProductName,
  normalizePrice,
  normalizeLink,
} from "../utils/normalizeUtils.js";

function deduplicateProducts(products) {
  const seen = new Set();
  return products.filter(p => {
    const key = `${p.productName}|${p.price}|${p.siteId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortByPrice(products) {
  return [...products].sort((a, b) => a.price - b.price);
}

export function prepareProducts(scrapedResults = []) {
  const normalized = scrapedResults.map(item => ({
    siteId: item.siteId,
    productName: normalizeProductName(item.productName),
    price: normalizePrice(item.price),
    link: normalizeLink(item.link, `https://${item.siteId.replace("_", ".")}`),
  }));

  const deduped = deduplicateProducts(normalized);
  const sorted = sortByPrice(deduped);

  return sorted;
}
