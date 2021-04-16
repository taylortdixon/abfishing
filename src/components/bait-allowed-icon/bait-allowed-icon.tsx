import { Tooltip } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import {
  CheckCircleOutline,
  NotInterested,
  RadioButtonUnchecked,
} from "@material-ui/icons";
import { BaitAllowedIconProps } from "./bait-allowed-icon.props.types";

const titleMap: Record<BaitAllowedIconProps["bait_allowed"], string> = {
  no: "Bait ban",
  partially: "Bait except bait fish allowed",
  yes: "Bait allowed",
};

export const BaitAllowedIcon: React.VFC<BaitAllowedIconProps> = ({
  bait_allowed,
}) => {
  let component = <NotInterested color="error" />;

  if (bait_allowed === "yes") {
    component = <CheckCircleOutline style={{ color: green[500] }} />;
  } else if (bait_allowed === "partially") {
    component = <RadioButtonUnchecked style={{ color: blue[500] }} />;
  }

  return <Tooltip title={titleMap[bait_allowed]}>{component}</Tooltip>;
};
