import { _ } from "lodash";
import { Waterbody } from "../../src/types/waterbody.type";
import * as pdf_table_extractor from "pdf-table-extractor";

const SPECIAL_BAIT_KEY = "Bait \nl = Bait \nexcept bait \nfish allowed";
const SPECIAL_TROUT_KEY = "Trout\nTotal";

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
    const waterbody = _.zipObject(rowHeader, waterbodyRow);

    const mapBaitAllowed = (baitAllowed: string): Waterbody["bait_allowed"] => {
      switch (baitAllowed) {
        case "Bait and bait \nfish allowed":
          return "yes";
        case "l":
          return "partially";
        default:
          return "no";
      }
    };

    return {
      bait_allowed: mapBaitAllowed(waterbody[SPECIAL_BAIT_KEY]),
      fish_management_zone: this.regulationsId,
      id: index,
      season: waterbody.Season,
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
        trout_total: waterbody[SPECIAL_TROUT_KEY],
      },
    };
  };
}
