import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { missions } from "../data/missions";

const MissionDetails = () => {
  const { missionId } = useParams();
  const navigate = useNavigate();

  const mission = missions.find((item) => item.id === missionId);

  if (!mission) {
    return (
      <Stack>
        <Typography>Mission not found.</Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Typography variant="overline">
        MISSION {String(mission.number).padStart(2, "0")}
      </Typography>

      <Typography variant="h3">{mission.title}</Typography>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography>{mission.description}</Typography>

            <Typography color="text.secondary">
              This is where the details of your birthday adventure will
              eventually appear.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/missions")}
            >
              Complete Mission
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default MissionDetails;
