import { AppBar, Toolbar, Typography } from "@mui/material";

export const MainMenuNav = () => (
  <AppBar position="static">
    <Toolbar>
      <img
        src="/icon.png"
        alt="AB Fishing Logo"
        width={50}
        height={32}
        style={{ padding: 12, width: 50 }}
      />
      <Typography variant="h6">AB Fishing</Typography>
    </Toolbar>
  </AppBar>
);
