import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h2">BIRTHDAY 30</Typography>

      <Typography>Welcome to your birthday adventure 🎂</Typography>

      <Button variant="outlined" onClick={handleLogout}>
        LOG OUT
      </Button>
    </Stack>
  );
};

export default Home;
