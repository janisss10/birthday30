import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={3}>
      <Typography variant="overline">BIRTHDAY30</Typography>

      <Typography variant="h1">30</Typography>

      <Typography variant="h5">Your birthday adventure awaits.</Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/missions")}
      >
        View Missions
      </Button>
    </Stack>
  );
};

export default Home;
