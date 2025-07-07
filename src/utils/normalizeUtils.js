export function normalizeProductName(name = "") {
  return name
    .replace(/\n+/g, " ")            
    .replace(/\++/g, " ")            
    .replace(/\s+/g, " ")            
    .replace(/(.+?)\s+\1$/, "$1")       
    .trim();
}

export function normalizePrice(priceStr = "") {
  const currencySymbol = priceStr.match(/[₹$€£]/)?.[0] || null;
  const currencyMap = { "₹": "INR", "$": "USD", "€": "EUR", "£": "GBP" };

  const match = priceStr.match(/[\d,]+/);
  const amount = match ? parseInt(match[0].replace(/,/g, ""), 10) : null;

  return {
    currency: currencyMap[currencySymbol] || "UNKNOWN",
    amount,
  };
}


export function normalizeLink(link = "", baseURL = "") {
  if (link.startsWith("http")) return link;
  try {
    const url = new URL(baseURL);
    return `${url.protocol}//${url.hostname}${link}`;
  } catch {
    return link;
  }
}
