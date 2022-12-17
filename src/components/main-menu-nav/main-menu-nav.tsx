import { AppBar, Toolbar, Typography } from "@mui/material";
import "./main-menu-nav.css";

export const MainMenuNav = () => (
  <AppBar position="static">
    <Toolbar>
      <img className="main_menu_nav__logo" src="/icon.png" alt="" />
      <Typography variant="h6">AB Fishing</Typography>
    </Toolbar>
  </AppBar>
);
