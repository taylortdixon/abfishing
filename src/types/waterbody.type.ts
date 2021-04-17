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
  | "dolly_varden";

export type Waterbody = {
  id: string;
  waterbody: string;
  waterbody_detail: string;
  season: string;
  bait_allowed: "yes" | "partially" | "no";
  fish_limits?: Partial<Record<FishLimit, string>>;
};
