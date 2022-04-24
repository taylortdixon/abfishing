import { ReactComponent as TroutIcon } from "../../static/trout.svg";
import { ReactComponent as WalleyeIcon } from "../../static/walleye.svg";
import { ReactComponent as PerchIcon } from "../../static/perch.svg";
import { ReactComponent as PikeIcon } from "../../static/pike.svg";
import { ReactComponent as BurbotIcon } from "../../static/burbot.svg";
import { ReactComponent as FishIcon } from "../../static/fish.svg";
import { ReactComponent as WhitefishIcon } from "../../static/whitefish.svg";
import { FishLimit } from "../../types/waterbody.type";

export const fishLimitsIconMap: Record<
  FishLimit,
  React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >
> = {
  brook_trout: TroutIcon,
  burbot: BurbotIcon,
  cisco: FishIcon,
  cutthroat_trout: TroutIcon,
  dolly_varden: TroutIcon,
  goldeye: FishIcon,
  lake_trout: TroutIcon,
  lake_whitefish: WhitefishIcon,
  mountain_whitefish: WhitefishIcon,
  northern_pike: PikeIcon,
  rainbow_trout: TroutIcon,
  trout_total: TroutIcon,
  walleye: WalleyeIcon,
  walleye_sauger: WalleyeIcon,
  yellow_perch: PerchIcon,
};
