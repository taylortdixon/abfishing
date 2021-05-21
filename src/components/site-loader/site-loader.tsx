import { makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  skeleton: {
    width: "100%",
  },
});

export const SiteLoader = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Skeleton className={classes.skeleton} />
      <Skeleton className={classes.skeleton} animation={false} />
      <Skeleton className={classes.skeleton} animation="wave" />
    </Container>
  );
};
