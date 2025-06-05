import { readdirSync, writeFileSync } from "fs";
import { RegulationsFileParser } from "./src/parse";
import { sortBy } from "lodash";
import { generateStructuredData } from "./src/generate-structured-data";
import { Waterbody } from "../src/types/waterbody.type";
import { generateSitemap } from "./src/generate-sitemap";
import { buildWaterbodyGroups } from "./src/waterbody-group-builder";
import { downloadLatestVersion } from "./src/download-latest-version";

const REGULATIONS_FOLDER = "./parser/regulations";
const version = "June 6, 2025";

const validateRegulationIds = (regulations: Waterbody[]) => {
  regulations.forEach((waterbody) => {
    const count = regulations.filter((reg) => reg.id === waterbody.id).length;
    if (count > 1) {
      throw new Error(
        `Duplicate ID for waterbody ${waterbody.waterbody} - ${waterbody.id}`
      );
    }
  });
};

const parseRegulations = async () => {
  const fileNames = readdirSync(`${REGULATIONS_FOLDER}`);

  await Promise.all(
    fileNames.map((fileName) =>
      downloadLatestVersion(fileName, REGULATIONS_FOLDER)
    )
  );

  const mappedRegulations = await Promise.all(
    fileNames.map((fileName) =>
      new RegulationsFileParser(`${REGULATIONS_FOLDER}/${fileName}`).parse()
    )
  );

  const regulations = sortBy(
    mappedRegulations.reduce((acc, reg) => {
      acc.push(...reg);
      return acc;
    }, []),
    (reg) => reg.waterbody
  );

  validateRegulationIds(regulations);

  const waterbodyGroups = buildWaterbodyGroups(regulations);

  writeFileSync(
    "./src/fishing-regulations.ts",
    `import { Waterbody, WaterbodyGroupMap } from "./types/waterbody.type";
    export const regulations: Waterbody[] = ${JSON.stringify(regulations)};
    `
  );

  writeFileSync(
    "./src/fishing-waterbody-groups.ts",
    `import { WaterbodyGroupMap } from "./types/waterbody.type";
    export const waterbodyGroups: WaterbodyGroupMap = ${JSON.stringify(
      waterbodyGroups
    )};`
  );

  const structuredData = generateStructuredData(version, regulations);

  writeFileSync(
    "./public/structured.html",
    `<script type="application/ld+json">
    ${JSON.stringify(structuredData)}
    </script>`
  );

  const sitemap = generateSitemap(version, waterbodyGroups);

  writeFileSync("./public/sitemap.xml", sitemap);

  const appRegulationGroups = {
    version,
    waterbody_groups: waterbodyGroups,
  };

  writeFileSync(
    "./public/regulations.json",
    JSON.stringify(appRegulationGroups)
  );

  const waterbodyIds = regulations.map((regulation) => regulation.id);
  const waterbodyGroupIds = Object.keys(waterbodyGroups);

  writeFileSync(
    "./src/waterbody-ids.ts",
    `
    export const waterbodyIds = ${JSON.stringify(waterbodyIds)};
    export const waterbodyGroupIds = ${JSON.stringify(waterbodyGroupIds)};
  `
  );
  writeFileSync(
    "./src/waterbody-group-ids.ts",
    `
    export const waterbodyGroupIds = ${JSON.stringify(waterbodyGroupIds)};
  `
  );
};

parseRegulations();
