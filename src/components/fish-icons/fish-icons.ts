import { FishLimit } from "../../types/waterbody.type";

const TroutIcon = "/fish-icons/trout.svg";
const WalleyeIcon = "/fish-icons/walleye.svg";
const PerchIcon = "/fish-icons/perch.svg";
const PikeIcon = "/fish-icons/pike.svg";
const BurbotIcon = "/fish-icons/burbot.svg";
const FishIcon = "/fish-icons/fish.svg";
const WhitefishIcon = "/fish-icons/whitefish.svg";

export const fishLimitsIconMap: Record<FishLimit, string> = {
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
