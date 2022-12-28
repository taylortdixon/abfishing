import { Switch, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { GridOverlay } from "@mui/x-data-grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    textAlign: "center",
  },
  label: {
    marginBottom: theme.spacing(1),
  },
}));

export const NoResultsRowsOverlay = () => {
  const classes = useStyles();
  return (
    <GridOverlay className={classes.root}>
      <Typography className={classes.label} variant="body1">
        No waterbody found
      </Typography>
      <Typography variant="body2">
        Use the default fishing regulations for the management zone
      </Typography>
    </GridOverlay>
  );
};
