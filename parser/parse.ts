import { _ } from "lodash";
import { Waterbody } from "../src/types/waterbody.type";
import * as pdf_table_extractor from "pdf-table-extractor";

const SPECIAL_BAIT_KEY = "Bait \nl = Bait \nexcept bait \nfish allowed";
const SPECIAL_TROUT_KEY = "Trout\nTotal";

type ExtractorResponse = {
  pageTables: Array<{
    page: number;
    tables: string[][];
  }>;
};

const mapWaterbody = (
  rowHeader: string[],
  waterbodyRow: string[],
  index: string
): Waterbody => {
  const waterbody = _.zipObject(rowHeader, waterbodyRow);

  const mapBaitAllowed = (baitAllowed: string): Waterbody["bait_allowed"] => {
    switch (baitAllowed) {
      case "Bait and bait\nfish allowed":
        return "yes";
      case "1":
        return "partially";
      default:
        return "no";
    }
  };

  return {
    bait_allowed: mapBaitAllowed(waterbody[SPECIAL_BAIT_KEY]),
    id: index,
    season: waterbody.Season,
    waterbody: waterbody.Waterbody,
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

//PDF parsed
function success(result: ExtractorResponse) {
  let regulations = [];
  result.pageTables.forEach((page) => {
    const [ignoreHeader, rowHeader, ...waterbodies] = page.tables;
    const mapped = waterbodies.map((waterbody, i) =>
      mapWaterbody(rowHeader, waterbody, `${page.page}-${i}`)
    );

    regulations = [...regulations, ...mapped];
  });

  console.log(regulations);
}

//Error
function error(err) {
  console.error("Error: " + err);
}

pdf_table_extractor("regulations/ES1-Lakes.pdf", success, error);
