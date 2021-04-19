type FishLimit =
  | "walleye"
  | "northern_pike"
  | "lake_trout"
  | "yellow_perch"
  | "mountain_whitefish"
  | "cutthroat_trout"
  | "brook_trout"
  | "rainbow_trout"
  | "trout_total"
  | "dolly_varden"
  | "walleye_sauger"
  | "burbot"
  | "goldeye"
  | "cisco";

export type Waterbody = {
  fish_management_zone: string;
  id: string;
  waterbody: string;
  waterbody_detail: string;
  season: string;
  bait_allowed: "yes" | "partially" | "no";
  fish_limits?: Partial<Record<FishLimit, string>>;
};
