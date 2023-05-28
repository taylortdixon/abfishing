import { AppBar, Toolbar, Typography } from "@mui/material";
import styles from "./main-menu-nav.module.css";

export const MainMenuNav = () => (
  <AppBar position="static">
    <Toolbar>
      <img
        className={styles.main_menu_nav__logo}
        src="/icon.png"
        alt="AB Fishing Logo"
        width={50}
        height={32}
      />
      <Typography variant="h6">AB Fishing</Typography>
    </Toolbar>
  </AppBar>
);
