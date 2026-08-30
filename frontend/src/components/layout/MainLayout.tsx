import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

const MainLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: 8,
      }}
    >
      <Outlet />

      <BottomNavigation />
    </Box>
  );
};

export default MainLayout;
