import { startCase, zipObject } from "lodash";
import { Waterbody } from "../../src/types/waterbody.type";
import * as pdf_table_extractor from "pdf-table-extractor";
import { exit } from "node:process";

const md5 = require("md5");

const SPECIAL_BAIT_KEY_1 = "Bait l = Bait except bait fish allowed";
const SPECIAL_BAIT_KEY_2 = "Bait l = Bait allowed";
const SPECIAL_BAIT_KEY_3 = "Bait l = Bait except Bait fish allowed";
const SPECIAL_BAIT_KEY_4 = "Bait";
const SPECIAL_BAIT_KEY_5 = "Bait l = Bait ban";
const SPECIAL_TROUT_KEY_1 = "TroutTotal";
const SPECIAL_TROUT_KEY_2 = "Trout Total";
const SPECIAL_WALLEYE_SAUGER_KEY = "WALL + SAUG";

type ExtractorResponse = {
  pageTables: Array<{
    page: number;
    tables: string[][];
  }>;
};

export class RegulationsFileParser {
  private regulationsId: string;

  constructor(private regulationsFilePath: string) {
    const matches = regulationsFilePath.match(/\w\w\d-[A-z]+/);
    if (!matches[0]) {
      throw new Error("Unable to parse regulations ID from filepath");
    }

    this.regulationsId = matches[0];
  }

  public parse = async (): Promise<Waterbody[]> => {
    return new Promise((resolve, reject) => {
      pdf_table_extractor(
        this.regulationsFilePath,
        (result) => resolve(this.parseSuccess(result)),
        (err) => reject(this.parseFailure(err))
      );
    });
  };

  private parseSuccess = (result: ExtractorResponse): Waterbody[] => {
    let regulations = [];

    result.pageTables.forEach((page) => {
      const [ignoreHeader, rowHeader, ...waterbodies] = page.tables;

      let previousWaterbodyName = "";
      let previousWaterbodyDescription = "";
      let previousWaterbodySeason = "";
      const mapped = waterbodies.map((waterbody, i) => {
        previousWaterbodyName = waterbody[0]
          ? waterbody[0]
          : previousWaterbodyName;

        previousWaterbodyDescription =
          !waterbody[0] && !waterbody[1]
            ? previousWaterbodyDescription
            : waterbody[1];

        previousWaterbodySeason = waterbody[2]
          ? waterbody[2]
          : previousWaterbodySeason;

        return this.parseWaterbody(
          rowHeader,
          waterbody,
          `${this.regulationsId}-${page.page}-${i}`,
          previousWaterbodyName,
          previousWaterbodyDescription,
          previousWaterbodySeason
        );
      });

      regulations = [...regulations, ...mapped];
    });

    return regulations;
  };

  private parseFailure = (err) => {
    console.error(`File: ${this.regulationsFilePath} - Error: ` + err);
  };

  private generateId = (
    waterbodyName: string,
    waterbodyDetail: string,
    waterbodySeason: string,
    baitAllowed: string
  ) => {
    const parsedName = waterbodyName
      .replace(/[()'\n]+/g, "")
      .toLowerCase()
      .split(" ")
      .splice(0, 3)
      .join("-");

    const hash = md5(
      `${this.regulationsId}-${waterbodyDetail}-${waterbodySeason}-${baitAllowed}`
    ).substr(0, 5);

    return `${parsedName}-${hash}`;
  };

  private parseWaterbody = (
    rowHeader: string[],
    waterbodyRow: string[],
    index: string,
    previousWaterbodyName: string,
    previousWaterbodyDescription: string,
    previousSeason: string
  ): Waterbody => {
    const trimNewlines = (values: string[]): string[] =>
      values.map((value) => value.replace(/\n/g, ""));

    const waterbody = zipObject(
      trimNewlines(rowHeader),
      trimNewlines(waterbodyRow)
    );

    const mapBaitAllowed = (): Waterbody["bait_ban"] => {
      if (waterbody[SPECIAL_BAIT_KEY_1] !== undefined) {
        if (waterbody[SPECIAL_BAIT_KEY_1] === "") {
          return "Bait ban";
        }
        return waterbody[SPECIAL_BAIT_KEY_1] !== "l"
          ? waterbody[SPECIAL_BAIT_KEY_1]
          : "Bait except bait fish allowed";
      }
      if (waterbody[SPECIAL_BAIT_KEY_2] !== undefined) {
        if (waterbody[SPECIAL_BAIT_KEY_2] === "") {
          return "Bait ban";
        }
        return waterbody[SPECIAL_BAIT_KEY_2] !== "l"
          ? waterbody[SPECIAL_BAIT_KEY_2]
          : "Bait allowed";
      }
      if (waterbody[SPECIAL_BAIT_KEY_3] !== undefined) {
        if (waterbody[SPECIAL_BAIT_KEY_3] === "") {
          return "Bait ban";
        }
        return waterbody[SPECIAL_BAIT_KEY_3] !== "l"
          ? waterbody[SPECIAL_BAIT_KEY_3]
          : "Bait except bait fish allowed";
      }
      if (waterbody[SPECIAL_BAIT_KEY_4] !== undefined) {
        if (waterbody[SPECIAL_BAIT_KEY_4] === "") {
          return "Bait ban";
        }
        return waterbody[SPECIAL_BAIT_KEY_4];
      }
      if (waterbody[SPECIAL_BAIT_KEY_5] !== undefined) {
        if (waterbody[SPECIAL_BAIT_KEY_5] === "") {
          return "Bait ban";
        }
        return waterbody[SPECIAL_BAIT_KEY_5] !== "l"
          ? waterbody[SPECIAL_BAIT_KEY_5]
          : "Bait ban";
      }

      return `Not Specified ${this.regulationsId} ${JSON.stringify(waterbody)}`;
    };

    const waterbodyName = waterbody.Waterbody
      ? waterbody.Waterbody
      : previousWaterbodyName;

    const waterbodyDetail = waterbody["Waterbody Detail"]
      ? waterbody["Waterbody Detail"]
      : previousWaterbodyDescription;

    let waterbodySeason = waterbody.Season ? waterbody.Season : previousSeason;

    waterbodySeason = startCase(waterbodySeason.toLowerCase())
      .replace(/ To /g, " to ")
      .replace(/ And /g, " and ");

    const baitAllowed = mapBaitAllowed();

    return {
      bait_ban: baitAllowed,
      fish_management_zone: this.regulationsId,
      id: this.generateId(
        waterbodyName,
        waterbodyDetail,
        waterbodySeason,
        baitAllowed
      ),
      season: waterbodySeason,
      waterbody: waterbodyName,
      waterbody_detail: waterbodyDetail,
      fish_limits: {
        walleye: waterbody.WALL,
        northern_pike: waterbody.NRPK,
        yellow_perch: waterbody.YLPR,
        lake_trout: waterbody.LKTR,
        mountain_whitefish: waterbody.MNWH,
        lake_whitefish: waterbody.LKWH,
        cutthroat_trout: waterbody.CTTR,
        brook_trout: waterbody.BKTR,
        dolly_varden: waterbody.DLVR,
        burbot: waterbody.BURB,
        cisco: waterbody.CISC,
        goldeye: waterbody.GOLD,
        rainbow_trout: waterbody.RNTR,
        walleye_sauger: waterbody[SPECIAL_WALLEYE_SAUGER_KEY],
        trout_total:
          waterbody[SPECIAL_TROUT_KEY_1] || waterbody[SPECIAL_TROUT_KEY_2],
      },
    };
  };
}
