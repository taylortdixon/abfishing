import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';
import { Container } from "@mui/material";

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
