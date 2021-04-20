import { startCase, zipObject } from "lodash";
import { Waterbody } from "../../src/types/waterbody.type";
import * as pdf_table_extractor from "pdf-table-extractor";

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
      const mapped = waterbodies.map((waterbody, i) => {
        previousWaterbodyName = waterbody[0]
          ? waterbody[0]
          : previousWaterbodyName;
        return this.parseWaterbody(
          rowHeader,
          waterbody,
          `${this.regulationsId}-${page.page}-${i}`,
          previousWaterbodyName
        );
      });

      regulations = [...regulations, ...mapped];
    });

    return regulations;
  };

  private parseFailure = (err) => {
    console.error(`File: ${this.regulationsFilePath} - Error: ` + err);
  };

  private parseWaterbody = (
    rowHeader: string[],
    waterbodyRow: string[],
    index: string,
    previousWaterbodyName: string
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

    return {
      bait_ban: mapBaitAllowed(),
      fish_management_zone: this.regulationsId,
      id: index,
      season: startCase(waterbody.Season.toLowerCase())
        .replace(/ To /g, " to ")
        .replace(/ And /g, " and "),
      waterbody: waterbody.Waterbody
        ? waterbody.Waterbody
        : previousWaterbodyName,
      waterbody_detail: waterbody["Waterbody Detail"],
      fish_limits: {
        walleye: waterbody.WALL,
        northern_pike: waterbody.NRPK,
        yellow_perch: waterbody.YLPR,
        lake_trout: waterbody.LKTR,
        mountain_whitefish: waterbody.MNWH,
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
