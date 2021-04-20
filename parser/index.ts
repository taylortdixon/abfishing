import { readdirSync, writeFileSync } from "fs";
import { RegulationsFileParser } from "./src/parse";

const REGULATIONS_FOLDER = "./parser/regulations";

const parseRegulations = async () => {
  const fileNames = readdirSync(`${REGULATIONS_FOLDER}`);

  const mappedRegulations = await Promise.all(
    fileNames.map((fileName) =>
      new RegulationsFileParser(`${REGULATIONS_FOLDER}/${fileName}`).parse()
    )
  );

  const regulations = mappedRegulations.reduce((acc, reg) => {
    acc.push(...reg);
    return acc;
  }, []);

  writeFileSync(
    "./src/fishing-regulations.ts",
    `import { Waterbody } from "./types/waterbody.type";
    export const regulations: Waterbody[] = ${JSON.stringify(regulations)};`
  );
};

parseRegulations();
