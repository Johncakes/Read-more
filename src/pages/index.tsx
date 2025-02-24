import { AppBar, Box, IconButton, Typography, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";

export default function Home() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>Hello world</Box>
    </Box>
  );
}
