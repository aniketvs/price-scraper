import fs from "fs";
import path from "path";
import yaml from "yaml";

export function loadAdapters(country, query) {
  const yamlPath = path.resolve("config", "sites.yaml");

  try {
    const file = fs.readFileSync(yamlPath, "utf8");
    const config = yaml.parse(file);

    const sites = config[country];
    if (!sites || !Array.isArray(sites)) {
      console.warn(`No sites configured for country: ${country}`);
      return [];
    }

    return sites.map(site => ({
      siteId: site.id,
      url: site.searchUrl.replace("{query}", encodeURIComponent(query)),
      selectors: site.selectors,
    }));
  } catch (err) {
    console.error("❌ Failed to load adapters:", err.message);
    return [];
  }
}
