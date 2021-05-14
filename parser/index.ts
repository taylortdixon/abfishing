import { readdirSync, writeFileSync } from "fs";
import { RegulationsFileParser } from "./src/parse";
import { sortBy } from "lodash";
import { generateStructuredData } from "./src/generate-structured-data";

const REGULATIONS_FOLDER = "./parser/regulations";
const version = "May 10, 2021";

const parseRegulations = async () => {
  const fileNames = readdirSync(`${REGULATIONS_FOLDER}`);

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

  writeFileSync(
    "./src/fishing-regulations.ts",
    `import { Waterbody } from "./types/waterbody.type";
    export const regulations: Waterbody[] = ${JSON.stringify(regulations)};`
  );

  const structuredData = generateStructuredData(version, regulations);

  writeFileSync(
    "./public/structured.html",
    `<script type="application/ld+json">
    ${JSON.stringify(structuredData)}
    </script>`
  );
};

parseRegulations();
