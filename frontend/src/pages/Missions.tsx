import { useEffect, useState } from "react";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

import type { Mission } from "../types/birthday";
import { getMissions } from "../services/missions";

const Missions = () => {
  const navigate = useNavigate();

  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMissions = async () => {
      try {
        const data = await getMissions();

        setMissions(data);
      } catch {
        setError("Unable to load missions.");
      } finally {
        setLoading(false);
      }
    };

    loadMissions();
  }, []);

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="overline">BIRTHDAY30</Typography>

        <Typography variant="h3">Missions</Typography>

        <Typography color="text.secondary">
          Complete each mission to continue your adventure.
        </Typography>
      </Stack>

      {loading && (
        <Typography color="text.secondary">Loading missions...</Typography>
      )}

      {error && <Typography color="error">{error}</Typography>}

      {!loading &&
        !error &&
        missions.map((mission) => (
          <Card
            key={mission.id}
            onClick={() => {
              if (mission.status !== "locked") {
                navigate(`/missions/${mission.id}`);
              }
            }}
            sx={{
              cursor: mission.status === "locked" ? "default" : "pointer",
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2}>
                {mission.status === "locked" && <LockOutlinedIcon />}

                {mission.status === "available" && <LockOpenOutlinedIcon />}

                {mission.status === "completed" && <CheckCircleIcon />}

                <Stack spacing={0.5}>
                  <Typography variant="caption">
                    MISSION {String(mission.number).padStart(2, "0")}
                  </Typography>

                  <Typography variant="h6">{mission.title}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {mission.description}
                  </Typography>
                </Stack>

                {mission.status === "locked" && (
                  <Chip label="Locked" size="small" />
                )}

                {mission.status === "available" && (
                  <Chip label="Available" size="small" color="primary" />
                )}

                {mission.status === "completed" && (
                  <Chip label="Complete" size="small" color="success" />
                )}
              </Stack>
            </CardContent>
          </Card>
        ))}
    </Stack>
  );
};

export default Missions;
