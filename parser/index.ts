import { readdirSync, writeFileSync } from "fs";
import { RegulationsFileParser } from "./src/parse";
import { sortBy } from "lodash";
import { generateStructuredData } from "./src/generate-structured-data";
import { Waterbody } from "../src/types/waterbody.type";

const REGULATIONS_FOLDER = "./parser/regulations";
const version = "May 10, 2021";

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
