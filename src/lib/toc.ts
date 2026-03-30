export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractToc(htmlContent: string): TocItem[] {
  const headingRegex = /<h([2-3])\s+id="([^"]+)"[^>]*>(.*?)<\/h[2-3]>/gi;
  const matches = htmlContent.matchAll(headingRegex);
  const items: TocItem[] = [];

  for (const match of matches) {
    // Strip HTML tags from heading text (e.g. anchor links)
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    items.push({
      level: parseInt(match[1], 10),
      id: match[2],
      text,
    });
  }

  return items;
}
