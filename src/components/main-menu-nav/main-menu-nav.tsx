import { AppBar, Toolbar, Typography } from "@mui/material";
import styles from "./main-menu-nav.module.css";

export const MainMenuNav = () => (
  <AppBar position="static">
    <Toolbar>
      <img className={styles.main_menu_nav__logo} src="/icon.png" alt="" />
      <Typography variant="h6">AB Fishing</Typography>
    </Toolbar>
  </AppBar>
);
