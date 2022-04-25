import {
  Waterbody,
  WaterbodyGroup,
  WaterbodyGroupMap,
} from "../../src/types/waterbody.type";
import * as dayjs from "dayjs";

export const generateSitemap = (
  version: string,
  regulations: Waterbody[],
  waterbodyGroups: WaterbodyGroupMap
) => {
  const formattedVersion = dayjs(version).format("YYYY-MM-DD");
  const regulationSitemaps = regulations
    .map(
      (waterbody) => `<url>
  <loc>https://www.abfishing.ca/waterbody/${waterbody.id}</loc>
  <lastmod>${formattedVersion}</lastmod>
  </url>`
    )
    .join("\n");

  const groupSitemaps = Object.values(waterbodyGroups)
    .map(
      (group) => `<url>
  <loc>https://www.abfishing.ca/regulations/${group.id}</loc>
  <lastmod>${formattedVersion}</lastmod>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

<url>
  <loc>https://www.abfishing.ca/</loc>
  <lastmod>${formattedVersion}</lastmod>
</url>
${regulationSitemaps}    
${groupSitemaps}     
    
</urlset>`;
};
