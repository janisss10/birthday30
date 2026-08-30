import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getValue = () => {
    if (location.pathname.startsWith("/missions")) {
      return "/missions";
    }

    if (location.pathname.startsWith("/memories")) {
      return "/memories";
    }

    return "/";
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      elevation={8}
    >
      <MuiBottomNavigation
        value={getValue()}
        onChange={(_, newValue) => navigate(newValue)}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeOutlinedIcon />}
        />

        <BottomNavigationAction
          label="Missions"
          value="/missions"
          icon={<FlagOutlinedIcon />}
        />

        <BottomNavigationAction
          label="Memory Lane"
          value="/memories"
          icon={<MenuBookOutlinedIcon />}
        />
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;
