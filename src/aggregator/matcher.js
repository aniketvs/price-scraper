import stringSimilarity from "string-similarity";

export function groupSimilarProducts(products, threshold = 0.85) {
  const groups = [];

  for (const product of products) {
    let matchedGroup = null;

    for (const group of groups) {
      const similarity = stringSimilarity.compareTwoStrings(
        product.productName.toLowerCase(),
        group.representativeName.toLowerCase()
      );

      if (similarity >= threshold) {
        matchedGroup = group;
        break;
      }
    }

    if (matchedGroup) {
      matchedGroup.items.push(product);
    } else {
      groups.push({
        representativeName: product.productName,
        items: [product],
      });
    }
  }

  return groups;
}
